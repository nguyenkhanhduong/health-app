import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const router:Router = Router();
const healthController = new HealthController();

router.get('/meals', healthController.getMeals);
router.get('/exercises', healthController.getExercises);
router.get('/diaries', healthController.getDiaries);

export default router;
