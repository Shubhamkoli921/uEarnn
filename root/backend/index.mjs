//config the env variables
import dotenv from "dotenv";
dotenv.config();

import cluster from "cluster";
import os from "os";
import app from "./app.mjs";

//using cluster module to run a one nodejs server instance on each cpu core
if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`worker process with id ${worker.process.pid} died!`);
    cluster.fork();
  });
} else {
  await app().catch((e) => {
    console.log(e);
    process.exit(1);
  });
}
