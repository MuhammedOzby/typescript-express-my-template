console.clear();
console.log("Server starting.");
import { createServer } from "http";
import { httpServerErrorHandling, onListening } from "./app.functs";
import { createConnection } from "typeorm";
import { User } from "@models/user.entity";
import * as express from "express";
import * as  logger from "morgan";

import IndexRouter from "@routes/index.route";
import UserRouter from "@routes/user.route";

const app = express();

/**
 * ? Configurations
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

/**
 * ? Pages
 */
app.use('/', IndexRouter);
app.use('/user', UserRouter);

createConnection({
  type: "postgres",
  host: process.env.DB_NAME,
  port: 5432,
  username: "postgres",
  password: process.env.DB_PASS,
  database: "planetafirst",
  entities: [
    User
  ],
  synchronize: true,
}).then(async connection => {
  const port = process.env.PORT || '3000';

  app.set('port', port);

  const server = createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);

  server.on('error', (error) => httpServerErrorHandling(error, port));
  server.on('listening', () => onListening(server, port));

}).catch(error => console.log(error));
