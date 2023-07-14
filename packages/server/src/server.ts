import Koa from 'koa';
import cors from '@koa/cors';
import dotenv from 'dotenv';
import KoaLogger from 'koa-logger';
import { bodyParser } from '@koa/bodyparser';
dotenv.config();

export default class Server {
  private app: Koa;

  constructor() {
    this.app = new Koa();
    this.setup();
  }

  /** server setup */
  private setup(): void {
    /** cors setting */
    this.app.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    );

    /** logger setting */
    this.app.use(KoaLogger());

    /** bodyparser setting */
    this.app.use(bodyParser());
  }

  /** server start */
  public start(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server is listening to port ${process.env.PORT}`);
    });
  }
}
