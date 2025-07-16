import { Router } from 'express';
import { auth } from '../middleware/auth';
import { validate, problemSchemas } from '../middleware/validation';
import {
  generateProblem,
  getProblems,
  getProblem,
  solveProblem,
  rateProblem,
  createProblem
} from '../controllers/problemController';

const router = Router();

// AI generisanje problema (zahtevaju autentifikaciju)
router.post('/generate', auth, validate(problemSchemas.generateProblem), generateProblem);

// Public routes za pregled problema
router.get('/', getProblems);
router.get('/:id', getProblem);

// Protected routes
router.post('/:id/solve', auth, validate(problemSchemas.solveProblem), solveProblem);
router.post('/:id/rate', auth, validate(problemSchemas.rateProblem), rateProblem);
router.post('/', auth, createProblem);

export default router; 