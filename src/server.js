const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const dbConnection = require("./config/config");

dbConnection();
const app = express();

app.use(
  cors({
    // origin: [process.env.FRONTEND_URL,process.env.BACKEND_URL,"http://localhost:8080"],
    origin : "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
    exposedHeaders: ["x-auth-token"],
  })
);
app.use(express.json());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//Protected routes
app.use("/api/users", userRoutes);
app.use("/api/products",productRoutes);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(chalk.yellow.bold(`Server is running on port ${PORT}`));
});

// Error handling
server.on("error", (error) => {
  console.error(chalk.red.bold("Server error:"), error);
  if (error.code === "EADDRINUSE") {
    console.log(
      chalk.red("Port is already in use. Trying a different port...")
    );
    const newPort = 5001;
    server.close(() => {
      server.listen(newPort, () => {
        console.log(chalk.yellow(`Server restarted on port ${newPort}`));
      });
    });
  }
});
