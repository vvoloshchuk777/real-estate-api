export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Real Estate API',
    description: 'API documentation for a Real Estate application',
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local server',
    },
  ],
  tags: [
    {
      name: 'Houses',
      description: 'All operations related to houses',
    },
  ],
  paths: {
    '/graphql': {
      post: {
        tags: ['Houses'],
        summary: 'Access to GraphQL',
        description:
          'General access point for GraphQL queries and mutations related to houses',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  query: { type: 'string' },
                  variables: { type: 'object' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'GraphQL Query Response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'object',
                      properties: {
                        houses: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              _id: { type: 'string' },
                              name: { type: 'string' },
                              numberOfRooms: { type: 'integer' },
                              builtDate: { type: 'string', format: 'date' },
                              latitude: { type: 'number' },
                              longitude: { type: 'number' },
                            },
                          },
                        },
                      },
                    },
                    errors: { type: 'array' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/houses': {
      get: {
        tags: ['Houses'],
        summary: 'Get all houses',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/House' },
                },
              },
            },
          },
          500: { description: 'Server error' },
        },
      },
      post: {
        tags: ['Houses'],
        summary: 'Create a new house',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/HouseInput',
              },
            },
          },
        },
        responses: {
          201: { description: 'Created' },
          400: { description: 'Bad request' },
          500: { description: 'Server error' },
        },
      },
    },
    '/api/houses/{id}': {
      put: {
        tags: ['Houses'],
        summary: 'Update a house by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/HouseInput' },
            },
          },
        },
        responses: {
          200: { description: 'Updated' },
          400: { description: 'Bad request' },
          404: { description: 'Not found' },
          500: { description: 'Server error' },
        },
      },
    },
    '/api/houses/biggest': {
      get: {
        tags: ['Houses'],
        summary: 'Get the biggest houses by number of rooms',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/House' },
                },
              },
            },
          },
          500: { description: 'Server error' },
        },
      },
    },
    '/api/houses/closest': {
      get: {
        tags: ['Houses'],
        summary: 'Get the biggest and newest houses near a specific location',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/House' },
                },
              },
            },
          },
          400: { description: 'Bad request - Missing required parameters' },
          500: { description: 'Server error' },
        },
        parameters: [
          {
            name: 'latitude',
            in: 'query',
            required: true,
            schema: { type: 'number', format: 'float' },
          },
          {
            name: 'longitude',
            in: 'query',
            required: true,
            schema: { type: 'number', format: 'float' },
          },
        ],
      },
    },
  },

  components: {
    schemas: {
      House: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          numberOfRooms: { type: 'integer' },
          builtDate: { type: 'string', format: 'date' },
          latitude: { type: 'number', format: 'float' },
          longitude: { type: 'number', format: 'float' },
        },
      },
      HouseInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          numberOfRooms: { type: 'integer' },
          builtDate: { type: 'string', format: 'date' },
          latitude: { type: 'number', format: 'float' },
          longitude: { type: 'number', format: 'float' },
        },
        required: [
          'name',
          'numberOfRooms',
          'builtDate',
          'latitude',
          'longitude',
        ],
      },
    },
  },
};
