import { Router } from 'express';
import { auth } from '../middleware/auth';
import { validate, authSchemas } from '../middleware/validation';
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword
} from '../controllers/authController';

const router = Router();

// Public routes
router.post('/register', validate(authSchemas.register), register);
router.post('/login', validate(authSchemas.login), login);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.put('/profile', auth, validate(authSchemas.updateProfile), updateProfile);
router.put('/password', auth, validate(authSchemas.changePassword), changePassword);

export default router; 