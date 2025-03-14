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
        Product: {
          type: "object",
          properties: {
            _id: { type: "string", description: "Product ID" },
            title: { type: "string", description: "Product title" },
            description: { type: "string", description: "Product description" },
            category: { type: "string", description: "Product category" },
            price: { type: "number", description: "Product price" },
            discountPercentage: { 
              type: "number", 
              description: "Discount percentage",
              "exclusiveMinimum": 0
            },
            rating: { 
              type: "number", 
              description: "Product rating",
              "exclusiveMinimum": 0
            },
            stock: { 
              type: "integer", 
              description: "Product stock quantity",
              "exclusiveMinimum": 0
            },
            brand: { type: "string", description: "Product brand" },
            sku: { type: "string", description: "Stock Keeping Unit" },
            weight: { type: "number", description: "Product weight" },
            dimensions: {
              type: "object",
              properties: {
                width: { type: "number", description: "Product width" },
                height: { type: "number", description: "Product height" },
                depth: { type: "number", description: "Product depth" }
              }
            },
            warrantyInformation: { type: "string", description: "Product warranty information" },
            shippingInformation: { type: "string", description: "Product shipping information" },
            availabilityStatus: { type: "string", description: "Product availability status" },
            reviews: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Review"
              }
            },
            returnPolicy: { type: "string", description: "Product return policy" },
            minimumOrderQuantity: { 
              type: "integer", 
              description: "Minimum order quantity",
              "exclusiveMinimum": 0
            },
            images: {
              type: "array",
              items: { type: "string", description: "Product images URLs" }
            },
            thumbnail: { type: "string", description: "Product thumbnail URL" },
            createdAt: { 
              type: "string", 
              format: "date",
              description: "When the product was created"
            },
            meta: {
              type: "object",
              properties: {
                createdAt: { 
                  type: "string", 
                  format: "date",
                  description: "Metadata creation date"
                },
                updatedAt: { 
                  type: "string", 
                  format: "date",
                  description: "Metadata last update date"
                },
                barcode: { type: "string", description: "Product barcode" },
                qrCode: { type: "string", description: "Product QR code URL" }
              }
            }
          },
          required: ["title", "description", "category", "price"]
        },
        Review: {
          type: "object",
          properties: {
            rating: { 
              type: "integer", 
              description: "Review rating",
              enum: [1, 2, 3, 4, 5]
            },
            comment: { type: "string", description: "Review comment" },
            date: { 
              type: "string", 
              format: "date",
              description: "Review date"
            },
            reviewerName: { type: "string", description: "Reviewer name" },
            reviewerEmail: { type: "string", description: "Reviewer email" }
          },
          required: ["rating", "comment", "date", "reviewerName", "reviewerEmail"]
        }
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
        url: "http://localhost:3000",
        description: "Local Server"
    
      }
    ],
  },
  apis: [path.join(__dirname, "routes/**/*.js"),path.join(__dirname, "controllers/**/*.js")], // Ensure this path is correct
};

const specs = swaggerJSDoc(swaggerOptions);

module.exports = specs;
