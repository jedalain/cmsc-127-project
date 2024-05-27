import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes';
import foodItemRoutes from './routes/foodItemRoutes';
import foodEstablishmentRoutes from './routes/foodEstablishmentRoutes';
import reviewRoutes from './routes/reviewRoutes';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// router
app.use('/users', userRoutes);
app.use('/food-items', foodItemRoutes);
app.use('/food-establishments', foodEstablishmentRoutes);
app.use('/reviews', reviewRoutes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
