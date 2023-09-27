import { Injectable } from '@nestjs/common';
import { ParseService } from '../parse/parse.service';
import AppResponse from '../lib/app.response';
import * as cheerio from 'cheerio';
import { GameEvent, GameEventView, GameUpdateNews } from './types';
import * as console from 'console';
import { GameUpdateNewsResponse } from './types/game-update-news-response.type';

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
          url: 'https://maplestory.nexon.com/Testworld/Update',
          selector: 'div.news_board ul li',
          titleSelector: 'p a span',
          linkSelector: 'p a',
        },
        cash: {
          url: 'https://maplestory.nexon.com/News/CashShop',
          selector: 'div.cash_board ul li',
          titleSelector: 'p a',
          linkSelector: 'p a',
        },
      };

      let url = 'https://maplestory.nexon.com/News/Update';

      if (target) {
        url = targetMap[target].url;

        if (!url) {
          return new AppResponse({
            name: 'InvalidTarget',
            message: 'Invalid target',
            statusCode: 400,
            payload: null,
          });
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

      return new AppResponse({
        name: '',
        message: '',
        statusCode: 200,
        payload: {
          data: updateNews,
          target: currentTarget,
          page: page || 1,
        },
      });
    } catch (e) {
      console.error(e);
      return new AppResponse({
        name: 'UnknownError',
        message: 'An unknown error occurred',
        statusCode: 500,
        payload: null,
      });
    }
  }

  public async getEvents(): Promise<AppResponse<GameEvent[]>> {
    try {
      const url = 'https://maplestory.nexon.com/News/Event';
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

      return new AppResponse({
        name: '',
        message: '',
        statusCode: 200,
        payload: sortedGameEvents,
      });
    } catch (e) {
      console.error(e);
      return new AppResponse({
        name: 'UnknownError',
        message: 'An unknown error occurred',
        statusCode: 500,
        payload: null,
      });
    }
  }

  public async getEventView(id: number): Promise<AppResponse<GameEventView>> {
    try {
      const eventList = await this.getEventIdList();

      if (!eventList.includes(id)) {
        return new AppResponse({
          name: 'EventNotFound',
          message: 'Event not found',
          statusCode: 404,
          payload: null,
        });
      }

      const url = `https://maplestory.nexon.com/News/Event/Ongoing/${id}`;
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

      return new AppResponse({
        name: '',
        message: '',
        statusCode: 200,
        payload: eventViewData,
      });
    } catch (e) {
      console.error(e);
      return new AppResponse({
        name: 'UnknownError',
        message: 'An unknown error occurred',
        statusCode: 500,
        payload: null,
      });
    }
  }

  private async getEventIdList(): Promise<number[]> {
    try {
      const url = 'https://maplestory.nexon.com/News/Event';
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
