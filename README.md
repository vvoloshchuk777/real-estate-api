# Real Estate Inventory Management API

This is an API for managing the inventory of a real estate company. It allows users to create, read, update, and index house entries. Additionally, it provides endpoints for finding the biggest houses by the number of rooms and the biggest and newest houses near a specific location based on latitude and longitude.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Error Handling](#error-handling)
- [Additional Features](#additional-features)
- [Data Model](#data-model)
- [Swagger Documentation](#swagger-documentation)
- [GraphQL](#graphql)

## Installation
1. Clone this repository.
2. Navigate to the project directory.
3. Run `docker-compose up -d`
4. Install dependencies by running `npm install`.
5. copy `dist.env` to `.env`

## Usage
1. Start the server by running `npm start`.
2. Access the API endpoints as described below.

## Endpoints
- `POST /api/houses`: Create a new house entry.
- `GET /api/houses`: Get a list of all houses.
- `PUT /api/houses/:id`: Update house details by ID.
- `GET /api/houses/biggest`: Get the biggest houses by the number of rooms (limited to 5 houses).
- `GET /api/houses/closest`: Get the biggest and newest houses near a specific location by providing latitude and longitude (limited to 3 houses).

## Data Model
The house entity includes the following attributes:
- House Name
- Number Of Rooms
- When it was built (time is not required)
- Latitude
- Longitude

## Swagger Documentation
The API is documented using Swagger. You can access the Swagger documentation by navigating to `/swagger` after starting the server.

## GraphQL
GraphQL support is provided for more flexible and specific data retrieval. You can access the GraphQL endpoint at `/graphql` and use it to query and retrieve data according to your needs.

### Examples of GraphQL Queries

#### Retrieve a list of all houses:
```graphql
{
  houses {
    _id
    name
    numberOfRooms
    builtDate
    latitude
    longitude
  }
}
```
#### Create a new house entry:
```graphql
mutation {
  createHouse(houseInput: {
    name: "New House"
    numberOfRooms: 4
    builtDate: "2020-01-01"
    latitude: 42.12345
    longitude: -71.54321
  }) {
    _id
    name
    numberOfRooms
    builtDate
    latitude
    longitude
  }
}
```

#### Create a new house entry:
```graphql
mutation {
  updateHouse(houseId: "houseIdHere", houseInput: {
    name: "Updated House"
    numberOfRooms: 5
    builtDate: "2022-05-10"
    latitude: 42.54321
    longitude: -71.12345
  }) {
    _id
    name
    numberOfRooms
    builtDate
    latitude
    longitude
  }
}
```
#### Find the biggest houses by the number of rooms (limited to 5):
```graphql
{
  biggestHouses {
    _id
    name
    numberOfRooms
    builtDate
    latitude
    longitude
  }
}
```
#### Find the biggest and newest houses near a specific location (limited to 3) by providing latitude and longitude:
```graphql
{
  biggestAndNewestHousesNearLocation(location: { latitude: 42.12345, longitude: -71.54321 }) {
    _id
    name
    numberOfRooms
    builtDate
    latitude
    longitude
  }
}

```
