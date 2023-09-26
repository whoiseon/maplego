import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ParseService {
  constructor() {}

  public async getHtml(url: string) {
    try {
      return await axios.get(url);
    } catch (e) {
      console.error(e);
    }
  }
}
