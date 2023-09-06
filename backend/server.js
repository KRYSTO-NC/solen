import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from './routes/userRoutes.js'
import installationRoutes from "./routes/installationRoutes.js";

const port = process.env.PORT || 5000;
const app = express();
connectDB();


// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie parser middleware
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("SOLEN API is running...");
});


app.use('/api/users', userRoutes)
app.use("/api/installations", installationRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
