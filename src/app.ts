import morgan from "morgan";
import express from "express";
import stoppable from "stoppable";
import { router } from "./router";
import { Server } from "http";

class App {
  app = express();
  private server?: Server;
  configure = async () => {
    this.app.use(
      express.json({
        limit: 1024 * 1024 * 3,
      }),
    );
    this.app.use(morgan("combined"));
    router(this.app);
  };
  start = async (port: number) => {
    await this.configure();
    // process.on('unhandledRejection', err => logger.error(err));
    this.server = stoppable(
      this.app.listen(port, () => {
        console.info(`Server listening on port ${port}`);
      }),
    );
    return;
  };
  stop = async () => {
    // @ts-ignore We don't have definitions file for this.
    this.server?.stop(async (err, isStopped) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      try {
        if (isStopped) {
          console.info("Http server closed.");
        }
      } catch (e) {
        console.error(e);
      }
    });
  };
}
export { App };
