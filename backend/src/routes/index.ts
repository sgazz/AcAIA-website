import { Router } from 'express';
import authRoutes from './auth';
import chatRoutes from './chat';
import problemRoutes from './problems';
import examRoutes from './exams';
import careerRoutes from './career';

const router = Router();

// API version prefix
const API_PREFIX = '/api/v1';

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API info
router.get('/', (req, res) => {
  res.json({
    message: 'AcAIA Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: `${API_PREFIX}/auth`,
      chat: `${API_PREFIX}/chat`,
      problems: `${API_PREFIX}/problems`,
      exams: `${API_PREFIX}/exams`,
      career: `${API_PREFIX}/career`
    }
  });
});

// Mount routes
router.use(`${API_PREFIX}/auth`, authRoutes);
router.use(`${API_PREFIX}/chat`, chatRoutes);
router.use(`${API_PREFIX}/problems`, problemRoutes);
router.use(`${API_PREFIX}/exams`, examRoutes);
router.use(`${API_PREFIX}/career`, careerRoutes);

export default router; 