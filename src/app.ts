import cors from "cors";
import express, { Application } from "express";
const app: Application = express();
// middle ware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
