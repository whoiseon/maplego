import axios from 'axios';
import * as cheerio from 'cheerio';

export type RankingType = 'Total' | 'Pop' | 'Guild' | 'Union' | 'HallOfFame';

interface GetRankingParams {
  type: RankingType;
  page?: string;
  world?: string;
}

class Crawler {
  constructor() {}

  public async getCharacterInfo(nickname: string) {
    try {
      const html = await this.getHtml(
        `https://maplestory.nexon.com/N23Ranking/World/Total?c=${nickname}`,
      );

      if (!html) {
        throw Error('not found html');
      }

      const $ = cheerio.load(html.data);
      const character = $('.rank_table tbody tr.search_com_chk');
      const userHomeUrl = `https://maplestory.nexon.com${character
        .find('td.left dl dt a')
        .attr('href')}`;
      const userGuild = character.find('td:nth-child(6)').text();

      const secretKey = userHomeUrl.split('=')[1];

      const userHomeHtml = await this.getHtml(
        `https://maplestory.nexon.com/Common/Character/Detail/${nickname}/Ranking?p=${secretKey}`,
      );

      if (!userHomeHtml) {
        throw Error('not found user home html');
      }

      const $$ = cheerio.load(userHomeHtml.data);

      // 캐릭터 정보

      const charInfo = $$('.char_info_top');

      const charNickname = charInfo.find('div.char_name span').text().slice(0, -1);
      const level = Number(charInfo.find('div.char_info dl:nth-child(1) dd').text().split('.')[1]);
      const job = charInfo.find('div.char_info dl:nth-child(2) dd').text().split('/')[1];
      const serverName = charInfo.find('div.char_info dl:nth-child(3) dd').text();
      const serverIcon = charInfo.find('div.char_info dl:nth-child(3) dd img').attr('src');
      const current_exp = Number(
        charInfo
          .find('div.char_info div.level_data span:nth-child(1)')
          .text()
          .replaceAll(',', '')
          .substring(3),
      );
      const popularity = Number(
        charInfo
          .find('div.char_info div.level_data span.pop_data')
          .text()
          .replaceAll(',', '')
          .substring(3),
      );

      // 랭킹 정보

      const rankInfo = $$('div.now_rank_list ul.n_rank_list');
      const total = Number(
        rankInfo
          .find('li:nth-child(1) dl dd:nth-child(3)')
          .text()
          .split(' ')[0]
          .replaceAll(',', ''),
      );
      const world = Number(
        rankInfo
          .find('li:nth-child(2) dl dd:nth-child(3)')
          .text()
          .split(' ')[0]
          .replaceAll(',', ''),
      );
      const jobRank = Number(
        rankInfo
          .find('li:nth-child(3) dl dd:nth-child(3)')
          .text()
          .split(' ')[0]
          .replaceAll(',', ''),
      );
      const popularityRank = Number(
        rankInfo
          .find('li:nth-child(4) dl dd:nth-child(3)')
          .text()
          .split(' ')[0]
          .replaceAll(',', ''),
      );
      const union = Number(
        rankInfo
          .find('li:nth-child(5) dl dd:nth-child(3)')
          .text()
          .split(' ')[0]
          .replaceAll(',', ''),
      );
      const achievement = Number(
        rankInfo
          .find('li:nth-child(6) dl dd:nth-child(3)')
          .text()
          .split(' ')[0]
          .replaceAll(',', ''),
      );

      return {
        character: {
          nickname: charNickname,
          level,
          job,
          server: {
            name: serverName,
            icon: serverIcon,
          },
          current_exp,
          popularity,
          guild: userGuild,
        },
        rank: {
          total,
          world,
          job: jobRank,
          popularity: popularityRank,
          union,
          achievement,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 유저 랭킹을 파싱해오는 함수
   * @param { GetRankingParams } params 랭킹 타입, 페이지, 월드
   * @returns
   */
  public async getRanking(params: GetRankingParams) {
    const { type, page, world } = params;

    try {
      const html = await this.getHtml(
        `https://maplestory.nexon.com/N23Ranking/World/${type}?page=${page ?? 1}&w=${world ?? 0}`,
      );

      if (!html) {
        throw Error('not found html');
      }

      const $ = cheerio.load(html.data);
      const list = $('.rank_table tbody tr');

      const charList: any[] = [];

      list.each((i, tag) => {
        const rank = this.parseRank($, tag);
        const char_img = $(tag).find('td.left .char_img img').attr('src');
        const server_img = $(tag).find('td.left dl dt a img').attr('src');
        const nickname = $(tag).find('td.left dl dt a').text();
        const job = $(tag).find('td.left dl dd').text().replaceAll(' ', '').split('/')[1];
        const level = Number($(tag).find('td:nth-child(3)').text().split('.')[1]);
        const current_exp = Number($(tag).find('td:nth-child(4)').text().replaceAll(',', ''));
        const popularity = Number($(tag).find('td:nth-child(5)').text().replaceAll(',', ''));
        const guild = $(tag).find('td:nth-child(6)').text();

        const character = {
          rank,
          char_img,
          server_img,
          nickname,
          job,
          level,
          current_exp,
          popularity,
          guild,
        };

        charList.push(character);
      });

      return charList;
    } catch (error) {
      console.error(error);
    }
  }

  private parseRank($: cheerio.CheerioAPI, tag: cheerio.Element): number {
    const findRank = $(tag).find('td:nth-child(1) p img').attr('alt');
    let rank: number;

    if (findRank) {
      rank = Number(findRank.charAt(0));
    } else {
      const reFindRank = $(tag).find('td:nth-child(1) p:nth-child(1)').text();
      rank = Number(reFindRank);
    }

    return rank;
  }

  private async getHtml(url: string) {
    try {
      return await axios.get(url);
    } catch (error) {
      console.error(error);
    }
  }
}

const crawler = new Crawler();
export default crawler;
