import houseService from '../services/house.service.js';

class HouseController {
  async getHouses() {
    try {
      return (await houseService.getHouses()) || [];
    } catch (error) {
      throw new Error('Error fetching houses: ' + error.message);
    }
  }

  async getBiggestHouses() {
    try {
      return (await houseService.getBiggestHouses()) || [];
    } catch (error) {
      throw new Error('Error fetching biggest houses: ' + error.message);
    }
  }

  async getBiggestAndNewestHousesNearLocation(data) {
    try {
      const { latitude, longitude } = data.location;
      return (
        (await houseService.getBiggestAndNewestHousesNearLocation(
          latitude,
          longitude
        )) || []
      );
    } catch (error) {
      throw new Error('Error fetching houses near location: ' + error.message);
    }
  }

  async createHouse(data) {
    try {
      return await houseService.createHouse(data.payload);
    } catch (error) {
      throw new Error('Error creating house: ' + error.message);
    }
  }

  async updateHouse(data) {
    try {
      return await houseService.updateHouse(data.id, data.payload);
    } catch (error) {
      throw new Error('Error updating house: ' + error.message);
    }
  }
}

export default new HouseController();
