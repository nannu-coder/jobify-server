require("express-async-errors");
require("dotenv").config();
const express = require("express");
const connectDB = require("./DataBase/connect");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const morgan = require("morgan");

//path
const authRoutes = require("./Routes/authRoutes");
const jobRoutes = require("./Routes/jobsRoutes");
const errorHandlerMiddelware = require("./Middleware/errorHandler");
const notFound = require("./Middleware/notFoundMiddleware");
const authenticate = require("./Middleware/Authenticate");

app.use(
  cors({
    origin: "https://jobify-server-beta.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticate, jobRoutes);

//Error Handler Middleware
app.use(notFound);
app.use(errorHandlerMiddelware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
