import cloudinary from "cloudinary";
import compression from 'compression';
import cors from "cors";
import dotenv from 'dotenv';
import express, { Express, Request, Response } from "express";
import helmet from 'helmet';
import morgan from 'morgan';
import connectDb from "./config/db";
import commentRoutes from "./routes/commentRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";


dotenv.config({
  path:"./.env"
});

// define port
const PORT =  process.env.PORT;

// initialize express
const app: Express = express();

// initialize helmet to secure express app
app.use(helmet());

//connect to db
connectDb();

// configure cloudinary 

cloudinary.v2.config({
  cloud_name: "social-network-101",
  api_key: "397828424674875",
  api_secret: "ZRMnO8CC7-SY-kUOXU9sjGRRNNc",
});
// initialize cors
app.use(cors({
  origin: "*",
  credentials:true,
}));



// Other Middlewares
app.use(compression());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.get("/", (req: Request, res: Response) => {
  res.send('<h1>Social Network API</h1>');
});
app.use("/posts", postRoutes);
app.use("/auth", userRoutes);
app.use("/comment"  ,commentRoutes);

// initialize server
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
