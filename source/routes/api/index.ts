import { Router } from 'express';
import { userRoutes } from './routesForUsers';
import { thoughtRoutes } from './routesForThoughts';


const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;
