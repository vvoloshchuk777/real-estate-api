import http from 'http';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import DataSource from './data-source.js';
import graphqlSchema from './gql/schema.js';
import graphqlResolver from './gql/resolvers.js';
import HouseRouter from './routes/house.router.js';
import swaggerDocument from './swagger/swagger.js';
import HouseController from './controllers/house.controller.js';
import {
  errorHandler,
  requestLogger,
  requestTiming,
} from './middlewares/index.js';

export default class App {
  constructor(appConfig = { port: 3000 }) {
    this.app = express();
    this.conf = appConfig;
    this.datasource = DataSource;

    this.#config();
    this.#setupRoutes();
    this.#setupHandlers();
  }

  async bootstrap() {
    await this.datasource.initialize();
    await this.#apolloServerConfig();
    console.log(`⚡ [Server ]: running at http://localhost:${this.conf.port}`);
    console.log(
      `⚡ [GraphQL]: running at http://localhost:${this.conf.port}/graphql`
    );
    console.log(
      `⚡ [Swagger]: running at http://localhost:${this.conf.port}/swagger`
    );
  }

  #config() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(requestTiming);

    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  async #apolloServerConfig() {
    const httpServer = http.createServer(this.app);

    const server = new ApolloServer({
      typeDefs: graphqlSchema,
      resolvers: graphqlResolver,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    this.app.use('/graphql', express.json(), expressMiddleware(server));

    httpServer.listen({ port: this.conf.port });
  }

  #setupRoutes() {
    this.app.use('/api/houses', new HouseRouter(HouseController));
  }

  #setupHandlers() {
    this.app.use(requestLogger);
    this.app.use(errorHandler);
  }
}
