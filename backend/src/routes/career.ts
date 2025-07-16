import { Router } from 'express';
import { auth } from '../middleware/auth';
import {
  generateCareerAdvice,
  getCareerPaths,
  assessSkills,
  getLearningPath
} from '../controllers/careerController';

const router = Router();

// AI generisanje karijernog saveta (zahtevaju autentifikaciju)
router.post('/advice', auth, generateCareerAdvice);

// Public routes
router.get('/paths', getCareerPaths);
router.get('/learning-path', getLearningPath);

// Protected routes
router.post('/assessment', auth, assessSkills);

export default router; 