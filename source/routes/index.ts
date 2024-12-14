import express from 'express';
import userRoutes from './api/routesForUsers';
import thoughtRoutes from './api/routesForThoughts';

const router = express.Router();

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

export default router;
