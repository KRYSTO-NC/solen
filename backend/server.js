import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import installations from "./data/installations.js";

const port = process.env.PORT || 5000;
const app = express();
connectDB();

app.get("/", (req, res) => {
  res.send("SOLEN API is running...");
});

app.get("/api/installations", (req, res) => {
    res.json(installations);
})


app.get("/api/installations/:id", (req, res) => {
    const installation = installations.find((i) => i._id === req.params.id);
    res.json(installation);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
