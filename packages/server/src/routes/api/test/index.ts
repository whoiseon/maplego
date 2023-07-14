import Router from '@koa/router';
import crawler, { RankingType } from 'src/lib/crawler';

const test = new Router();

// example http://localhost:3060/api/test/rank?type=Total&page=1&world=0
test.get('/rank', async ctx => {
  const { type, page, world } = ctx.query;
  const list = await crawler.getRanking({
    type: type as RankingType,
    page: page as string,
    world: world as string,
  });

  ctx.body = {
    message: 'pong',
    list,
  };
});

// example http://localhost:3060/api/test/character?nickname=캐릭터명
test.get('/character', async ctx => {
  const { nickname } = ctx.query;
  const character = await crawler.getCharacterInfo(nickname as string);

  ctx.body = {
    message: 'pong',
    data: character,
  };
});

export default test;
