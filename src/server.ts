import mongoose from "mongoose";
import app from "./app";
import config from "./config";
const dbConnect = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("database connect successfully");
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("error occured in db connection");
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

dbConnect();
