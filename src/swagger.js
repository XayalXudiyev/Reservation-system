const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Reservation System API",
      version: "1.0.0",
      description: "API documentation for the Reservation System",
    },
    servers: [
      {
        url: "https://reservation-system.up.railway.app",
      },
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerOptions;
