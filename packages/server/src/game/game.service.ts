import { Injectable } from '@nestjs/common';
import { ParseService } from '../parse/parse.service';
import AppResponse from '../lib/app.response';
import * as cheerio from 'cheerio';
import {
  GameCharacterRank,
  GameEvent,
  GameEventView,
  GameNotice,
  GameNoticeView,
  GameUpdateNews,
  GameUpdateNewsView,
} from './types';
import * as console from 'console';
import { GameUpdateNewsResponse } from './types/game-update-news-response.type';
import { parseUrl } from '../lib/parseUrl';
import { GameNoticeResponse } from './types/game-notice-response.type';
import { GameRankResponse } from './types/game-rank-response.type';

@Injectable()
export class GameService {
  constructor(private readonly parseService: ParseService) {}

  public async getUpdateNews(
    page: number,
    target: string,
  ): Promise<AppResponse<GameUpdateNewsResponse>> {
    try {
      const targetMap = {
        tespia: {
          url: parseUrl.update.tespia,
          selector: 'div.news_board ul li',
          titleSelector: 'p a span',
          linkSelector: 'p a',
        },
        cash: {
          url: parseUrl.update.cashShop,
          selector: 'div.cash_board ul li',
          titleSelector: 'p a',
          linkSelector: 'p a',
        },
      };

      let url = parseUrl.update.normal;

      if (target) {
        url = targetMap[target].url;

        if (!url) {
          return new AppResponse('InvalidTarget');
        }
      }

      if (page) {
        url = `${url}?page=${page}`;
      }

      const html = await this.parseService.getHtml(url);
      const $ = cheerio.load(html.data);
      let selector = 'div.update_board ul li';

      if (target) {
        selector = targetMap[target].selector;
      }

      const board = $(selector);
      const updateNews: GameUpdateNews[] = [];
      board.each((i, el) => {
        const titleSelector = target
          ? targetMap[target].titleSelector
          : 'p a span';

        const titleArray = $(el).find(titleSelector).text().trim().split('   ');
        const link = $(el).find('p a').attr('href');
        const id = Number(
          link.split('/')[link.split('/').length - 1].split('?')[0],
        );
        let date = $(el).find('div.heart_date dl dd').text().trim();
        let thumbnail = '';
        const isNew = this.checkIsNewUpdateNews(date);

        if (target === 'cash') {
          date = $(el).find('div.cash_list_wrap dl dd.date > p').text().trim();
          thumbnail = $(el).find('div.cash_list_wrap dl dt a img').attr('src');
        }

        updateNews.push({
          id,
          title: titleArray,
          link,
          date,
          thumbnail,
          isNew,
        });
      });

      let currentTarget = 'update';
      if (target) currentTarget = target;

      return new AppResponse('Success', {
        data: updateNews,
        target: currentTarget,
        page: page || 1,
      });
    } catch (e) {
      console.error(e);
      return new AppResponse('Unknown');
    }
  }

  public async getUpdateNewsView(
    id: number,
    target: string,
  ): Promise<AppResponse<GameUpdateNewsView>> {
    try {
      const targetMap = {
        tespia: {
          url: parseUrl.update.view.tespia(id),
        },
        cash: {
          url: parseUrl.update.view.cashShop(id),
        },
      };

      let url = parseUrl.update.view.normal(id);
      let currentTarget = 'update';
      if (target) currentTarget = target;

      if (target) {
        url = targetMap[target].url;

        if (!url) {
          return new AppResponse('InvalidTarget');
        }
      }

      const html = await this.parseService.getHtml(url);
      const $ = cheerio.load(html.data);
      const content = $('div.div_inner');

      const title = content.find('p.qs_title span').text().trim();
      let date = content
        .find('div.qs_info_wrap div.qs_info p.last')
        .text()
        .trim();

      if (target === 'cash') {
        date = content.find('div.qs_info_wrap span.event_date').text().trim();
      }

      const link = url;
      let htmlContent = content.find('div.qs_text div.new_board_con').html();

      if (target === 'cash') {
        htmlContent = content
          .find('div.qs_text div.new_board_con div:nth-child(1)')
          .html();
      }

      return new AppResponse('Success', {
        title,
        date,
        link,
        content: htmlContent,
      });
    } catch (e) {
      console.error(e);
      return new AppResponse('Unknown');
    }
  }

  public async getEvents(): Promise<AppResponse<GameEvent[]>> {
    try {
      const url = parseUrl.event.normal;
      const html = await this.parseService.getHtml(url);
      const $ = cheerio.load(html.data);
      const events = $('div.event_board ul li');

      const gameEvents: GameEvent[] = [];

      events.each((i, el) => {
        const title = $(el).find('dd.data a').text();
        const link = $(el).find('dd.data a').attr('href');
        const thumbnail = $(el).find('dt img').attr('src');

        const linkSplit = link.split('/');
        const id = Number(linkSplit[linkSplit.length - 1]);

        const date = $(el).find('dd.date').text();
        const dateSplit = date.split('~');
        const startDate = dateSplit[0].replaceAll(' ', '').replaceAll('\n', '');
        const endDate = dateSplit[1].replaceAll(' ', '').replaceAll('\n', '');

        const gameEvent: GameEvent = {
          id,
          title,
          link,
          thumbnail,
          startDate,
          endDate,
          diffDays: this.calculateDiffDays(endDate),
        };

        gameEvents.push(gameEvent);
      });

      const sortedGameEvents = gameEvents.sort((a, b) => {
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      });

      return new AppResponse('Success', sortedGameEvents);
    } catch (e) {
      console.error(e);
      return new AppResponse('Unknown');
    }
  }

  public async getEventView(id: number): Promise<AppResponse<GameEventView>> {
    try {
      const eventList = await this.getEventIdList();

      if (!eventList.includes(id)) {
        return new AppResponse('NotFound');
      }

      const url = parseUrl.event.view.normal(id);
      const html = await this.parseService.getHtml(url);
      const $ = cheerio.load(html.data);
      const eventView = $('div.contents_wrap');

      const title = eventView.find('p.qs_title').text().trim();
      const date = eventView
        .find('div.qs_info_wrap span.event_date')
        .text()
        .trim();
      const startDate = date.split('~')[0].trim();
      const endDate = date.split('~')[1].trim();
      const content = eventView
        .find('div.qs_text div.new_board_con img')
        .attr('src');

      const eventViewData: GameEventView = {
        title,
        startDate,
        endDate,
        content,
      };

      return new AppResponse('Success', eventViewData);
    } catch (e) {
      console.error(e);
      return new AppResponse('Unknown');
    }
  }

  private async getEventIdList(): Promise<number[]> {
    try {
      const url = parseUrl.event.normal;
      const html = await this.parseService.getHtml(url);
      const $ = cheerio.load(html.data);
      const events = $('div.event_board ul li');

      const gameEventIdList: number[] = [];

      events.each((i, el) => {
        const link = $(el).find('dd.data a').attr('href');
        const linkSplit = link.split('/');
        const id = Number(linkSplit[linkSplit.length - 1]);

        gameEventIdList.push(id);
      });

      return gameEventIdList;
    } catch (e) {
      console.error(e);
    }
  }

  public async getNotice(
    page: number,
    target: string,
  ): Promise<AppResponse<GameNoticeResponse>> {
    try {
      const targetMap = {
        all: {
          url: parseUrl.notice.all,
        },
        notice: {
          url: parseUrl.notice.notice,
        },
        inspection: {
          url: parseUrl.notice.inspection,
        },
        gmDiary: {
          url: parseUrl.notice.gmDiary,
        },
      };

      let url = parseUrl.notice.all;

      if (target) {
        url = targetMap[target].url;

        if (!url) {
          return new AppResponse('InvalidTarget');
        }
      }

      if (page) {
        url = `${url}?page=${page}`;
      }

      const html = await this.parseService.getHtml(url);
      const $ = cheerio.load(html.data);
      const newsBoard = $('div.news_board ul li');

      const noticeList: GameNotice[] = [];

      newsBoard.each((i, el) => {
        const title = $(el).find('p:nth-of-type(1) a span').text().trim();
        const link = $(el).find('p:nth-of-type(1) a').attr('href');
        const id = Number(
          link.split('/')[link.split('/').length - 1].split('?')[0],
        );
        let target = $(el).find('p:nth-of-type(1) a em img').attr('alt');

        if (target[0] === '[') {
          target = target.slice(1, -1);
        }

        const date = $(el).find('div.heart_date dl dd').text().trim();

        noticeList.push({
          title,
          link,
          id,
          target,
          date,
        });
      });

      let currentTarget = 'all';
      if (target) currentTarget = target;

      return new AppResponse('Success', {
        data: noticeList,
        target: currentTarget,
        page: page || 1,
      });
    } catch (e) {
      console.error(e);
      return new AppResponse('Unknown');
    }
  }

  public async getNoticeView(
    id: number,
    target: string,
  ): Promise<AppResponse<GameNoticeView>> {
    try {
      const targetMap = {
        all: {
          url: parseUrl.notice.view.all(id),
        },
        notice: {
          url: parseUrl.notice.view.notice(id),
        },
        inspection: {
          url: parseUrl.notice.view.inspection(id),
        },
        gmDiary: {
          url: parseUrl.notice.view.gmDiary(id),
        },
      };

      let url = parseUrl.update.view.normal(id);
      let currentTarget = 'all';
      if (target) currentTarget = target;

      if (target) {
        url = targetMap[target].url;

        if (!url) {
          return new AppResponse('InvalidTarget');
        }
      }

      const html = await this.parseService.getHtml(url);
      const $ = cheerio.load(html.data);
      const content = $('div.contents_wrap');

      const title = content.find('p.qs_title span').text().trim();
      let postTarget = content.find('p.qs_title em img').attr('alt') || '';

      if (postTarget[0] === '[') {
        postTarget = postTarget.slice(1, -1);
      }

      const date = content
        .find('div.qs_info_wrap div.qs_info p.last')
        .text()
        .trim();

      const htmlContent = content.find('div.qs_text div.new_board_con').html();

      return new AppResponse('Success', {
        id,
        title,
        target: postTarget,
        date,
        link: url,
        content: htmlContent,
      });
    } catch (e) {
      console.error(e);
      return new AppResponse('Unknown');
    }
  }

  public async getRank(
    page: number,
    world: number,
    target?: string,
  ): Promise<AppResponse<GameRankResponse>> {
    try {
      const targetMap = {
        all: {
          url: parseUrl.rank.all(page, world),
        },
        dojang: {
          url: parseUrl.rank.dojang(page, world),
        },
        union: {
          url: parseUrl.rank.union(page, world),
        },
        seed: {
          url: parseUrl.rank.seed(page, world),
        },
        pop: {
          url: parseUrl.rank.pop(page, world),
        },
      };

      let url = targetMap.all.url;
      let currentTarget = 'all';

      if (target) {
        url = targetMap[target].url;

        if (!url) {
          return new AppResponse('InvalidTarget');
        }
      }

      const html = await this.parseService.getHtml(url);
      const $ = cheerio.load(html.data);
      const rankItems = $('.rank_table tbody tr');

      const rankList: GameCharacterRank[] = [];

      rankItems.each((i, el) => {
        let rank = $(el)
          .find('td:nth-of-type(1) p:nth-of-type(1)')
          .text()
          .trim();

        const isRanker =
          $(el).hasClass('rank01') ||
          $(el).hasClass('rank02') ||
          $(el).hasClass('rank03');

        if (isRanker) {
          rank = $(el)
            .find('td:nth-of-type(1) p:nth-of-type(1) img')
            .attr('alt')
            .slice(0, -1);
        }

        const characterImage = $(el)
          .find('td:nth-of-type(2) span.char_img img')
          .attr('src');

        const serverSplit = $(el)
          .find('td:nth-of-type(2) dl dt a img')
          .attr('src')
          .split('/');

        const server = serverSplit[serverSplit.length - 1]
          .split('.')[0]
          .split('_')[1];

        const characterName = $(el)
          .find('td:nth-of-type(2) dl dt a')
          .text()
          .trim();

        const job = $(el).find('td:nth-of-type(2) dl dd').text().trim();
        const jobName = job.split(' / ')[1];

        let level = 0;
        let exp = '';
        let pop = '';
        let guild = '';
        let record = '';
        let clearTime = '';
        let unionLevel = '';
        let unionPower = '';

        if (target === 'pop' || target === 'all') {
          level = Number(
            $(el).find('td:nth-of-type(3)').text().trim().split('.')[1],
          );
          exp = $(el).find('td:nth-of-type(4)').text().trim() || '';
          pop = $(el).find('td:nth-of-type(5)').text().trim() || '';
          guild = $(el).find('td:nth-of-type(6)').text().trim() || '';
        }

        if (target === 'dojang' || target === 'seed') {
          level = Number(
            $(el).find('td:nth-of-type(3)').text().trim().split('.')[1],
          );
          record = $(el).find('td:nth-of-type(4)').text().trim();
          clearTime = $(el).find('td:nth-of-type(5)').text().trim();
        }

        if (target === 'union') {
          unionLevel = $(el).find('td:nth-of-type(3)').text().trim();
          unionPower = $(el).find('td:nth-of-type(4)').text().trim();
        }

        rankList.push({
          rank,
          characterImage,
          server,
          characterName,
          jobName,
          level,
          exp,
          pop,
          guild,
          record,
          clearTime,
          unionLevel,
          unionPower,
        });
      });

      currentTarget = target || 'all';
      const currentPage = page || 1;

      return new AppResponse('Success', {
        data: rankList,
        target: currentTarget,
        page: currentPage,
      });
    } catch (e) {
      console.error(e);
      return new AppResponse('Unknown');
    }
  }

  private calculateDiffDays(endDate: string): number {
    // 오늘 날짜와 마감 날짜를 비교해서 며칠 남았는지 계산
    const today = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - today.getTime();

    return Math.ceil(diff / (1000 * 3600 * 24)) + 1;
  }

  private checkIsNewUpdateNews(date: string): boolean {
    // date를 기준으로 7일 이내의 게시글인지 확인
    const today = new Date();
    const postDate = new Date(date);
    const diff = today.getTime() - postDate.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    return diffDays <= 7;
  }
}
