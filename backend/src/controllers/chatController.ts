import { Request, Response } from 'express';
import { Chat, IMessage } from '../models/Chat';
import { aiService } from '../services/aiService';
import { mockChats, getRandomAIResponse } from '../utils/mockData';

interface AuthRequest extends Request {
  user?: any;
}

// Kreiranje novog chat-a
export const createChat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, subject, difficulty = 'beginner' } = req.body;
    const userId = req.user._id;
    try {
      const chat = new Chat({
        userId,
        title,
        subject,
        metadata: {
          difficulty,
          learningObjectives: [],
          totalTokens: 0,
          estimatedDuration: 30
        }
      });
      await chat.save();
      res.status(201).json({ success: true, message: 'Chat uspešno kreiran.', data: { chat } });
      return;
    } catch (e) {
      // MOCK
      const chat = {
        _id: `mock-chat-${Date.now()}`,
        userId,
        title,
        subject,
        messages: [],
        metadata: { difficulty, learningObjectives: [], totalTokens: 0, estimatedDuration: 30 },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      res.status(201).json({ success: true, message: 'Chat uspešno kreiran (mock mode).', data: { chat } });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
  }
};

// Dobijanje liste chat-ova korisnika
export const getChats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;
    try {
      const query: any = { userId, isActive: true };
      const chats = await Chat.find(query)
        .sort({ lastActivity: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));
      const total = await Chat.countDocuments(query);
      res.json({ success: true, data: { chats, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } } });
      return;
    } catch (e) {
      // MOCK
      const userChats = mockChats.filter(c => c.userId === userId);
      res.json({ success: true, data: { chats: userChats, pagination: { page: 1, limit: userChats.length, total: userChats.length, pages: 1 } } });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
  }
};

// Dobijanje specifičnog chat-a
export const getChat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    try {
      const chat = await Chat.findOne({ _id: id, userId, isActive: true });
      if (!chat) {
        res.status(404).json({ success: false, message: 'Chat nije pronađen.' });
        return;
      }
      res.json({ success: true, data: { chat } });
      return;
    } catch (e) {
      // MOCK
      const chat = mockChats.find(c => c._id === id && c.userId === userId);
      if (!chat) {
        res.status(404).json({ success: false, message: 'Chat nije pronađen (mock).' });
        return;
      }
      res.json({ success: true, data: { chat } });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
  }
};

// Slanje poruke u chat
export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user._id;
    try {
      const chat = await Chat.findOne({ _id: id, userId, isActive: true });
      if (!chat) {
        res.status(404).json({ success: false, message: 'Chat nije pronađen.' });
        return;
      }
      const userMessage: IMessage = { role: 'user', content, timestamp: new Date() };
      chat.messages.push(userMessage);
      chat.lastActivity = new Date();
      const messages = chat.messages.map(msg => ({ role: msg.role, content: msg.content }));
      const aiResponse = await aiService.generateChatResponse(messages, { subject: chat.subject, difficulty: chat.metadata.difficulty });
      const assistantMessage: IMessage = { role: 'assistant', content: aiResponse.content, timestamp: new Date() };
      chat.messages.push(assistantMessage);
      chat.metadata.totalTokens += aiResponse.tokens;
      await chat.save();
      res.json({ success: true, message: 'Poruka uspešno poslata.', data: { userMessage, assistantMessage, totalTokens: chat.metadata.totalTokens } });
      return;
    } catch (e) {
      // MOCK
      const chat = mockChats.find(c => c._id === id && c.userId === userId);
      if (!chat) {
        res.status(404).json({ success: false, message: 'Chat nije pronađen (mock).' });
        return;
      }
      const userMessage = { role: 'user', content, timestamp: new Date() };
      const assistantMessage = { role: 'assistant', content: getRandomAIResponse('chat'), timestamp: new Date() };
      chat.messages.push(userMessage, assistantMessage);
      res.json({ success: true, message: 'Poruka uspešno poslata (mock mode).', data: { userMessage, assistantMessage, totalTokens: 0 } });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška pri komunikaciji sa AI-om. Pokušajte ponovo.' });
  }
};

// Brisanje chat-a
export const deleteChat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    try {
      const chat = await Chat.findOneAndUpdate({ _id: id, userId, isActive: true }, { isActive: false }, { new: true });
      if (!chat) {
        res.status(404).json({ success: false, message: 'Chat nije pronađen.' });
        return;
      }
      res.json({ success: true, message: 'Chat uspešno obrisan.' });
      return;
    } catch (e) {
      // MOCK
      const chatIndex = mockChats.findIndex(c => c._id === id && c.userId === userId);
      if (chatIndex === -1) {
        res.status(404).json({ success: false, message: 'Chat nije pronađen (mock).' });
        return;
      }
      mockChats.splice(chatIndex, 1);
      res.json({ success: true, message: 'Chat uspešno obrisan (mock mode).' });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
  }
};

// Ažuriranje chat-a
export const updateChat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, subject, difficulty } = req.body;
    const userId = req.user._id;

    const updateData: any = {};
    if (title) updateData.title = title;
    if (subject) updateData.subject = subject;
    if (difficulty) updateData['metadata.difficulty'] = difficulty;

    const chat = await Chat.findOneAndUpdate(
      { _id: id, userId, isActive: true },
      updateData,
      { new: true }
    );

    if (!chat) {
      res.status(404).json({
        success: false,
        message: 'Chat nije pronađen.'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Chat uspešno ažuriran.',
      data: { chat }
    });
  } catch (error) {
    console.error('Greška pri ažuriranju chat-a:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
}; 