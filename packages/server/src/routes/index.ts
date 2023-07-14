import Router from '@koa/router';
import api from './api';

const routes = new Router();

routes.use('/api', api.routes());

routes.get('/', ctx => {
  ctx.body = {
    name: 'ms-in',
    version: '1.0.0',
  };
});

export default routes;
