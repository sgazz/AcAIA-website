import { Router } from 'express';
import { auth } from '@/middleware/auth';
import { validate } from '@/middleware/validation';
import {
  generateExam,
  getExams,
  getExam,
  submitExam,
  getExamResults,
  getExamStats
} from '@/controllers/examController';

const router = Router();

// AI generisanje ispita (zahtevaju autentifikaciju)
router.post('/generate', auth, generateExam);

// Public routes za pregled ispita
router.get('/', getExams);
router.get('/:id', getExam);

// Protected routes
router.post('/:id/submit', auth, submitExam);
router.get('/:id/results', auth, getExamResults);
router.get('/:id/stats', auth, getExamStats);

export default router; 