import { Injectable } from '@nestjs/common';
import { ParseService } from '../parse/parse.service';
import AppResponse from '../lib/app.response';
import * as cheerio from 'cheerio';
import { GameEvent } from './types';

@Injectable()
export class GameService {
  constructor(private readonly parseService: ParseService) {}

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

      return new AppResponse({
        name: '',
        message: '',
        statusCode: 200,
        payload: gameEvents,
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

  public async getEventView(id: number): Promise<AppResponse<any>> {
    try {
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

  private calculateDiffDays(endDate: string): number {
    // 오늘 날짜와 마감 날짜를 비교해서 며칠 남았는지 계산
    const today = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - today.getTime();

    return Math.ceil(diff / (1000 * 3600 * 24)) + 1;
  }
}
