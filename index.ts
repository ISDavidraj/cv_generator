import express from 'express';
import cors from 'cors';
import userRoutes from './app/routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use the userRoutes for all user-related endpoints
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});