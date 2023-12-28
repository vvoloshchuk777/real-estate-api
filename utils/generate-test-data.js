import { faker } from '@faker-js/faker';
import DataSource from '../src/data-source.js';
import House from '../src/models/house.js';
import { numToGenerate } from "../src/config.js";


const generateRandomHouses = async numHouses => {
  await DataSource.initialize();

  const housePromises = [];

  for (let i = 0; i < numHouses; i++) {
    const name = faker.location.street();
    const numberOfRooms = faker.number.int({ min: 1, max: 10 });
    const builtDate = faker.date.past({ years: 10, refDate: new Date() });
    const latitude = faker.location.latitude();
    const longitude = faker.location.longitude();

    const newHouse = new House({
      name,
      numberOfRooms,
      builtDate,
      latitude,
      longitude,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });

    housePromises.push(newHouse.save());
  }

  try {
    await Promise.all(housePromises);
    console.log(`${numHouses} houses generated and saved!`);
  } catch (err) {
    console.error('Error saving house:', err);
  }
};

generateRandomHouses(numToGenerate).then(process.exit(0)).catch(process.exit(1));
