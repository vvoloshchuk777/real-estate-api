import { buildSchema } from 'graphql';

export default buildSchema(`
  type House {
    _id: ID!
    name: String!
    numberOfRooms: Int!
    builtDate: String!
    latitude: Float!
    longitude: Float!
  }

  input HouseInput {
    name: String!
    numberOfRooms: Int!
    builtDate: String!
    latitude: Float!
    longitude: Float!
  }

  type Query {
    houses: [House]!
    biggestHouses: [House]!
    biggestAndNewestHousesNearLocation(location: LocationInput!): [House]!
  }
  
  type Mutation {
    createHouse(houseInput: HouseInput!): House
    updateHouse(houseId: ID!, houseInput: HouseInput!): House
  }
  
  input LocationInput {
    latitude: Float!
    longitude: Float!
  }
`);
