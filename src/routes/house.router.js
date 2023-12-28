import express from 'express';
import {
  validateClosestHouses,
  validateCreateHouse,
} from '../middlewares/index.js';

class HouseRouter extends express.Router {
  constructor(HouseController) {
    super();
    this.controller = HouseController;
    this.#register();
  }

  #register() {
    this.post('/', [validateCreateHouse], async (req, res) => {
      await this.controller.createHouse({ payload: req.body });

      res.status(201).end();
    });
    this.get('/', async (req, res) => {
      const houses = await this.controller.getHouses();

      res.status(200).json(houses);
    });
    this.put('/:id', [validateCreateHouse], async (req, res) => {
      const payload = { id: req.params.id, payload: req.body };
      const updatedHouse = await this.controller.updateHouse(payload);

      res.status(200).json(updatedHouse);
    });
    this.get('/biggest', async (req, res) => {
      const biggest = await this.controller.getBiggestHouses();

      res.status(200).json(biggest);
    });
    this.get('/closest', [validateClosestHouses], async (req, res) => {
      const payload = {
        location: {
          latitude: req.query.latitude,
          longitude: req.query.longitude,
        },
      };
      const biggestClosest =
        await this.controller.getBiggestAndNewestHousesNearLocation(payload);

      res.status(200).json(biggestClosest);
    });
  }
}

export default HouseRouter;
