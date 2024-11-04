/* eslint-disable */
export const apiDocs = {
  tags: [
    {
      name: "Health",
      description: "Health check endpoint",
    },
  ],
  paths: {
    "/api/v1/health": {
      get: {
        summary: "Check the health of the system",
        tags: ["Health"],
        responses: {
          "200": {
            description: "🚀 Service is up and running... !",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                    },
                    timestamp: {
                      type: "string",
                    },
                  },
                  example: {
                    status: "🚀 Service is up and running... !",
                    timestamp: "2024-10-07T12:34:56Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      IHealthMessage: {
        type: "object",
        properties: {
          status: {
            type: "string",
            description: "The status of the health check",
            example: "🚀 Service is up and running... !",
          },
          timestamp: {
            type: "string",
            format: "date-time",
            description:
              "The timestamp when the health check was performed, in ISO 8601 format.",
            example: "2024-10-07T12:34:56Z",
          },
        },
        required: ["status", "timestamp"],
      },
    },
  },
};
