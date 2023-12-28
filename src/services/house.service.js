import House from '../models/house.js';
import { NotFoundError } from '../errors/index.js';

class HouseService {
  distance = 5000;
  // multiplier, kilometer as the default unit , 1609.3 for miles
  unitValue = 1000;
  async getHouses() {
    return House.find();
  }

  async getBiggestHouses() {
    return House.find().sort({ numberOfRooms: -1 }).limit(5);
  }

  async getBiggestAndNewestHousesNearLocation(latitude, longitude, limit = 3) {
    return House.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          maxDistance: this.distance * this.unitValue,
          distanceField: 'distance',
          distanceMultiplier: 1 / this.unitValue,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          numberOfRooms: 1,
          builtDate: 1,
          latitude: 1,
          longitude: 1,
        },
      },
      {
        $sort: {
          numberOfRooms: -1,
        },
      },
      { $limit: limit },
    ]);
  }

  async createHouse(data) {
    const house = new House(this.#extendInputData(data));
    return await house.save();
  }

  async updateHouse(houseId, data) {
    if (!(await this.isHouseExists(houseId))) {
      throw new NotFoundError('House not found');
    }
    return House.findByIdAndUpdate(houseId, this.#extendInputData(data), {
      new: true,
    });
  }

  async isHouseExists(houseId) {
    const result = await House.findById(houseId);

    return !!result;
  }

  #extendInputData(input) {
    return {
      ...input,
      location: {
        type: 'Point',
        coordinates: [input.longitude, input.latitude],
      },
    };
  }
}

export default new HouseService();
