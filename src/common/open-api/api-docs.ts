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
                },
              },
            },
          },
        },
      },
    },
  },
};

