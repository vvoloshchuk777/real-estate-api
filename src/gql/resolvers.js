import houseController from '../controllers/house.controller.js';
import { validateHouseInput } from '../middlewares/index.js';
export default {
  Query: {
    houses: () => {
      return houseController.getHouses();
    },
    biggestHouses: () => houseController.getBiggestHouses(),
    biggestAndNewestHousesNearLocation: (parent, args) =>
      houseController.getBiggestAndNewestHousesNearLocation(args),
  },
  Mutation: {
    createHouse: validateHouseInput((parent, args) => {
      return houseController.createHouse({ payload: args.houseInput });
    }),
    updateHouse: validateHouseInput((parent, args) =>
      houseController.updateHouse({
        id: args.houseId,
        payload: args.houseInput,
      })
    ),
  },
};
