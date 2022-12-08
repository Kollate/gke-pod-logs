const READINESS_PROBE_DELAY = 10 * 1000;
import config from "#root/config";
import { App } from "./app";

const app = new App();
async function init() {
  try {
    await app.start(parseInt(config.PORT));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

void init();

process.on("SIGTERM", async () => {
  console.info("Closing http server.");
  setTimeout(
    () =>
      app
        .stop()
        .then(() => process.exit(0))
        .catch((err) => {
          console.error(err);
          process.exit(1);
        }),
    READINESS_PROBE_DELAY,
  );
});
