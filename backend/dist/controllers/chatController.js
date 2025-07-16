"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChat = exports.deleteChat = exports.sendMessage = exports.getChat = exports.getChats = exports.createChat = void 0;
const Chat_1 = require("@/models/Chat");
const aiService_1 = require("@/services/aiService");
const createChat = async (req, res) => {
    try {
        const { title, subject, difficulty = 'beginner' } = req.body;
        const userId = req.user._id;
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
        res.status(201).json({
            success: true,
            message: 'Chat uspešno kreiran.',
            data: { chat }
        });
    }
    catch (error) {
        console.error('Greška pri kreiranju chat-a:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.createChat = createChat;
const getChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10, subject } = req.query;
        const query = { userId, isActive: true };
        if (subject)
            query.subject = subject;
        const chats = await Chat_1.Chat.find(query)
            .sort({ lastActivity: -1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .populate('userId', 'firstName lastName email');
        const total = await Chat_1.Chat.countDocuments(query);
        res.json({
            success: true,
            data: {
                chats,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / Number(limit))
                }
            }
        });
    }
    catch (error) {
        console.error('Greška pri dobijanju chat-ova:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.getChats = getChats;
const getChat = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const chat = await Chat_1.Chat.findOne({ _id: id, userId, isActive: true })
            .populate('userId', 'firstName lastName email');
        if (!chat) {
            res.status(404).json({
                success: false,
                message: 'Chat nije pronađen.'
            });
            return;
        }
        res.json({
            success: true,
            data: { chat }
        });
    }
    catch (error) {
        console.error('Greška pri dobijanju chat-a:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.getChat = getChat;
const sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user._id;
        const chat = await Chat_1.Chat.findOne({ _id: id, userId, isActive: true });
        if (!chat) {
            res.status(404).json({
                success: false,
                message: 'Chat nije pronađen.'
            });
            return;
        }
        const userMessage = {
            role: 'user',
            content,
            timestamp: new Date()
        };
        chat.messages.push(userMessage);
        chat.lastActivity = new Date();
        const messages = chat.messages.map(msg => ({
            role: msg.role,
            content: msg.content
        }));
        const aiResponse = await aiService_1.aiService.generateChatResponse(messages, {
            subject: chat.subject,
            difficulty: chat.metadata.difficulty
        });
        const assistantMessage = {
            role: 'assistant',
            content: aiResponse.content,
            timestamp: new Date()
        };
        chat.messages.push(assistantMessage);
        chat.metadata.totalTokens += aiResponse.tokens;
        await chat.save();
        res.json({
            success: true,
            message: 'Poruka uspešno poslata.',
            data: {
                userMessage,
                assistantMessage,
                totalTokens: chat.metadata.totalTokens
            }
        });
    }
    catch (error) {
        console.error('Greška pri slanju poruke:', error);
        res.status(500).json({
            success: false,
            message: 'Greška pri komunikaciji sa AI-om. Pokušajte ponovo.'
        });
    }
};
exports.sendMessage = sendMessage;
const deleteChat = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const chat = await Chat_1.Chat.findOneAndUpdate({ _id: id, userId, isActive: true }, { isActive: false }, { new: true });
        if (!chat) {
            res.status(404).json({
                success: false,
                message: 'Chat nije pronađen.'
            });
            return;
        }
        res.json({
            success: true,
            message: 'Chat uspešno obrisan.'
        });
    }
    catch (error) {
        console.error('Greška pri brisanju chat-a:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
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