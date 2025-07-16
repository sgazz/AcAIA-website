"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChat = exports.deleteChat = exports.sendMessage = exports.getChat = exports.getChats = exports.createChat = void 0;
const Chat_1 = require("../models/Chat");
const aiService_1 = require("../services/aiService");
const mockData_1 = require("../utils/mockData");
const createChat = async (req, res) => {
    try {
        const { title, subject, difficulty = 'beginner' } = req.body;
        const userId = req.user._id;
        try {
            const chat = new Chat_1.Chat({
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
            return res.status(201).json({ success: true, message: 'Chat uspešno kreiran.', data: { chat } });
        }
        catch (e) {
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
            return res.status(201).json({ success: true, message: 'Chat uspešno kreiran (mock mode).', data: { chat } });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
    }
};
exports.createChat = createChat;
const getChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10 } = req.query;
        try {
            const query = { userId, isActive: true };
            const chats = await Chat_1.Chat.find(query)
                .sort({ lastActivity: -1 })
                .limit(Number(limit))
                .skip((Number(page) - 1) * Number(limit));
            const total = await Chat_1.Chat.countDocuments(query);
            return res.json({ success: true, data: { chats, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } } });
        }
        catch (e) {
            const userChats = mockData_1.mockChats.filter(c => c.userId === userId);
            return res.json({ success: true, data: { chats: userChats, pagination: { page: 1, limit: userChats.length, total: userChats.length, pages: 1 } } });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
    }
};
exports.getChats = getChats;
const getChat = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        try {
            const chat = await Chat_1.Chat.findOne({ _id: id, userId, isActive: true });
            if (!chat)
                return res.status(404).json({ success: false, message: 'Chat nije pronađen.' });
            return res.json({ success: true, data: { chat } });
        }
        catch (e) {
            const chat = mockData_1.mockChats.find(c => c._id === id && c.userId === userId);
            if (!chat)
                return res.status(404).json({ success: false, message: 'Chat nije pronađen (mock).' });
            return res.json({ success: true, data: { chat } });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
    }
};
exports.getChat = getChat;
const sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user._id;
        try {
            const chat = await Chat_1.Chat.findOne({ _id: id, userId, isActive: true });
            if (!chat)
                return res.status(404).json({ success: false, message: 'Chat nije pronađen.' });
            const userMessage = { role: 'user', content, timestamp: new Date() };
            chat.messages.push(userMessage);
            chat.lastActivity = new Date();
            const messages = chat.messages.map(msg => ({ role: msg.role, content: msg.content }));
            const aiResponse = await aiService_1.aiService.generateChatResponse(messages, { subject: chat.subject, difficulty: chat.metadata.difficulty });
            const assistantMessage = { role: 'assistant', content: aiResponse.content, timestamp: new Date() };
            chat.messages.push(assistantMessage);
            chat.metadata.totalTokens += aiResponse.tokens;
            await chat.save();
            res.json({ success: true, message: 'Poruka uspešno poslata.', data: { userMessage, assistantMessage, totalTokens: chat.metadata.totalTokens } });
        }
        catch (e) {
            const chat = mockData_1.mockChats.find(c => c._id === id && c.userId === userId);
            if (!chat)
                return res.status(404).json({ success: false, message: 'Chat nije pronađen (mock).' });
            const userMessage = { role: 'user', content, timestamp: new Date() };
            const assistantMessage = { role: 'assistant', content: (0, mockData_1.getRandomAIResponse)('chat'), timestamp: new Date() };
            chat.messages.push(userMessage, assistantMessage);
            res.json({ success: true, message: 'Poruka uspešno poslata (mock mode).', data: { userMessage, assistantMessage, totalTokens: 0 } });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Greška pri komunikaciji sa AI-om. Pokušajte ponovo.' });
    }
};
exports.sendMessage = sendMessage;
const deleteChat = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        try {
            const chat = await Chat_1.Chat.findOneAndUpdate({ _id: id, userId, isActive: true }, { isActive: false }, { new: true });
            if (!chat)
                return res.status(404).json({ success: false, message: 'Chat nije pronađen.' });
            res.json({ success: true, message: 'Chat uspešno obrisan.' });
        }
        catch (e) {
            const chatIndex = mockData_1.mockChats.findIndex(c => c._id === id && c.userId === userId);
            if (chatIndex === -1)
                return res.status(404).json({ success: false, message: 'Chat nije pronađen (mock).' });
            mockData_1.mockChats.splice(chatIndex, 1);
            res.json({ success: true, message: 'Chat uspešno obrisan (mock mode).' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
    }
};
exports.deleteChat = deleteChat;
const updateChat = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subject, difficulty } = req.body;
        const userId = req.user._id;
        const updateData = {};
        if (title)
            updateData.title = title;
        if (subject)
            updateData.subject = subject;
        if (difficulty)
            updateData['metadata.difficulty'] = difficulty;
        const chat = await Chat_1.Chat.findOneAndUpdate({ _id: id, userId, isActive: true }, updateData, { new: true });
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
    }
    catch (error) {
        console.error('Greška pri ažuriranju chat-a:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.updateChat = updateChat;
//# sourceMappingURL=chatController.js.map