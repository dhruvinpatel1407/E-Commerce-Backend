const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

require("dotenv").config();
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Booking API",
      description: "API documentation for movie booking system",
      version: "1.0.0",
      contact: {
        name: "API Support",
        email: "contact@moviebooking.com",
      },
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", description: "User ID" },
            userName: {
              type: "string",
              description: "Username chosen by the user",
            },
            email: { type: "string", description: "User email address" },
          },
          required: ["userName", "email"],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: process.env.BACKEND_URL,
        description: "Production server"
      },
      {
        url: "http://localhost:8080",
        description: "Local Server"
    
      }
    ],
  },
  apis: [path.join(__dirname, "routes/**/*.js"),path.join(__dirname, "controllers/**/*.js")], // Ensure this path is correct
};

const specs = swaggerJSDoc(swaggerOptions);

module.exports = specs;
