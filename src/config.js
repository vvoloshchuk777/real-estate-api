import { config } from 'dotenv';

config();

export const appConfig = {
  port: process.env.PORT || 3000,
};

export const dbConfig = {
  db: process.env.DATABASE,
  uri: `mongodb://localhost:27017`,
};

export const numToGenerate = process.env.NUM_HOUSES_TO_GENERATE || 10;
