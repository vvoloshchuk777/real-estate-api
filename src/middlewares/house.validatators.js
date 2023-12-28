import { ClientError } from '../errors/index.js';

export const validateHouseInput =
  resolver => async (parent, args, context, info) => {
    const { houseInput } = args;

    if (
      !houseInput.name ||
      houseInput.numberOfRooms <= 0 ||
      !houseInput.builtDate ||
      !houseInput.latitude ||
      !houseInput.longitude
    ) {
      throw new ClientError('Validation error: Check your input data');
    }

    return resolver(parent, args, context, info);
  };

// REST Validations

export const validateCreateHouse = (req, res, next) => {
  if (
    !req.body.name ||
    req.body.numberOfRooms <= 0 ||
    !req.body.builtDate ||
    !req.body.latitude ||
    !req.body.longitude
  ) {
    next(new ClientError('Validation error: Check your input data'));
  }

  next();
};

export const validateClosestHouses = (req, res, next) => {
  if (!req.query.latitude && !req.query.longitude) {
    req.next(new ClientError('Required parameters are missing'));
  }

  next();
};
