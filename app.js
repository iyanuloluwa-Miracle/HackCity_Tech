const express = require("express");
const {
  notFoundHandler,
  errorHandler,
} = require("./src/middleware/errorHandler");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api/v1/", require("./src/routes/auth.route"));
app.use("/api/v1/", require("./src/routes/post.route"));
app.use("/api/v1/", require("./src/routes/categories.route"));
app.use("/api/v1/", require("./src/routes/socialAuthRoutes"));
// Middleware to generate 404 error for undefined routes
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
