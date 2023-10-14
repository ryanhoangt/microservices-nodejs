import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error when connecting to MongoDB:", err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000...");
  });
};

start();
