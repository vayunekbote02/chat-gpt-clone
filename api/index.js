// * Imports
const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const colors = require("colors");
const cors = require("cors");

// * Route paths
const authRoutes = require("./routes/authRoutes");

// * Initializations
const app = express();
app.use(express.json());
dotenv.config();

// * Database connection
connectDB();

// * CONSTANTS
const PORT = process.env.PORT || 5000;

// * Middleware
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// * Endpoints
app.use("/api/v1/auth", authRoutes);

// * Error Handler
app.use(errorHandler);

// * Starting the server
app.listen(PORT, (req, res) => {
  console.log(`Server running on PORT ${PORT}`);
});
