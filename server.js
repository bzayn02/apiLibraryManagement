import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();

// Middlewares
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server running good!!!',
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(`Unable to connect to server.`)
    : console.log(`Server is running at port http://localhost:${PORT}`);
});
