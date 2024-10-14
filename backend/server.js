import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import songRouter from './routes/songRoute.js'; // Update route import

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use('/song', songRouter);  
app.use('/songs', express.static('uploads'));

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
