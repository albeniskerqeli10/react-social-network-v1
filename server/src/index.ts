import cloudinary from 'cloudinary';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDb from './config/db';
import commentRoutes from './routes/commentRoutes';
import postRoutes from './routes/postRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config({
  path: './.env',
});

// define port
const PORT = process.env.PORT;

const app: Express = express();
const whitelistDomains = [
  'http://localhost:3000',
  'https://react-social-network-101.netlify.app',
  'https://react-social-network-101.netlify.app/',
];
//@ts-ignore

app.use(
  cors({
    origin: '*',
  })
);

app.use(helmet());
//connect to db
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

connectDb();

// configure cloudinary

cloudinary.v2.config({
  cloud_name: 'social-network-101',
  api_key: '397828424674875',
  api_secret: 'ZRMnO8CC7-SY-kUOXU9sjGRRNNc',
});
// initialize cors

// Other Middlewares
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.get('/', (req: Request, res: Response) => {});

app.use('/posts', postRoutes);
app.use('/auth', userRoutes);
app.use('/comment', commentRoutes);

// initialize server
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
