import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import userRouter from './src/routers/userRouter.js';
import bookRouter from './src/routers/bookRouter.js';
import borrowRouter from './src/routers/borrowRouter.js';
import connectMongoDB from './src/config/mongoDB.js';
import cors from 'cors';

const app = express();

// PORT
const PORT = process.env.PORT || 8000;

// Connect MongoDB
connectMongoDB();

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

// APIs

// User Router
app.use('/api/v1/user', userRouter);

// Borrow Router
app.use('/api/v1/book/borrow', borrowRouter);

// Book Router
app.use('/api/v1/book', bookRouter);

// Root URL server testing
app.use('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server running good!!!',
  });
});

// Listening the server
app.listen(PORT, (error) => {
  error
    ? console.log(`Unable to connect to server.`)
    : console.log(`Server is running at port http://localhost:${PORT}`);
});
