import { Router } from 'express';
import { auth } from '../middleware/auth';
import { validate, chatSchemas } from '../middleware/validation';
import {
  createChat,
  getChats,
  getChat,
  sendMessage,
  deleteChat,
  updateChat
} from '../controllers/chatController';

const router = Router();

// Sve rute zahtevaju autentifikaciju
router.use(auth);

// Chat management
router.post('/', validate(chatSchemas.createChat), createChat);
router.get('/', getChats);
router.get('/:id', getChat);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);

// Messages
router.post('/:id/messages', validate(chatSchemas.sendMessage), sendMessage);

export default router; 