import http from "http";
import async from "async";
import { printIp } from "./services/app-service";
import { PORT, NODE_ENV } from "./constants";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import express from "express";
import { API_URI } from "./constants";
import db from "./db";
import api from "./routers/api";
import helmet from "helmet";

const signals = ["SIGINT", "SIGTERM"];
const app = express();

app.set("db", db);
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(API_URI, api);

const server = http.createServer(app);
server.listen(PORT);

const closeApp = (err: any) => {
  console.log("Now application will be closed!", err || "");
  err ? process.exit(1) : process.exit(0);
};

const closeServer = (next: Function) => {
  console.log("Now server will be closed!");
  server.close(next);
};

const closeDbConnection = (next: any) => {
  console.log("Now db will be closed!");
  db.close(next);
};

const onListening = () => {
  const addr: any = server.address();
  console.log(`Listening on port ${addr.port}`);
  if (NODE_ENV === "development") {
    console.log(`This is testing instance.`);
    console.log(`To run production provide NODE_ENV = production.`);
  }
  printIp();
};

const onError = (err: any) => {
  if (err.syscall !== "listen") {
    throw err;
  }

  switch (err.code) {
    case "EACCES":
      console.log(`Port ${PORT} requires elevated privileges`);
      return process.exit(1);
    case "EADDRINUSE":
      console.log(`Port ${PORT} is already in use`);
      return process.exit(1);
    default:
      throw err;
  }
};

server.on("error", onError);
server.on("listening", onListening);

signals.forEach((signal: any) => {
  process.once(signal, () => {
    console.log(signal, " happened!");
    async.waterfall([closeServer, closeDbConnection], closeApp);
  });
});
