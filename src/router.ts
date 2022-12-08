import * as express from "express";
import { fetchLogs } from "./handlers";
import { healthCheck } from "./healthCheck";

export const router = (app: express.Application) => {
  app.get("/healthz", async (req, res) => {
    const isHealthy = await healthCheck();
    if (isHealthy) {
      res.status(200).send("OK");
    } else {
      res.status(500).send("NOT-OK");
    }
  });
  app.get("/logs/:namespace/:pod/:container", async (req, res) => {
    const result = await fetchLogs({
      container: req.params.container,
      namespace: req.params.namespace,
      pod: req.params.pod,
    });
    res.status(200).send(result);
  });
};
// };
