import mongoose from 'mongoose';
import { dbConfig } from './config.js';
class DataSource {
  constructor(config) {
    this.config = config;
  }

  async initialize() {
    await mongoose.connect(`${this.config.uri}/${this.config.db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.info('Data Source has been initialized! DB: ', this.config.db);
  }
}

export default new DataSource(dbConfig);
