const path = require("path");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./DataBase/connect.js");
const Job = require("./Models/jobSchema.js");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.deleteMany();

    const filePath = path.join(__dirname, "mock-data.json");
    const data = fs.readFileSync(filePath, "utf8");

    const jsonProducts = JSON.parse(data);
    await Job.create(jsonProducts);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
