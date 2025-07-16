"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamStats = exports.getExamResults = exports.submitExam = exports.getExam = exports.getExams = exports.generateExam = void 0;
const Exam_1 = require("../models/Exam");
const aiService_1 = require("../services/aiService");
const mockData_1 = require("../utils/mockData");
const generateExam = async (req, res) => {
    try {
        const { subject, difficulty = 'beginner', numberOfQuestions = 10, duration = 60 } = req.body;
        const userId = req.user._id;
        try {
            const aiExam = await aiService_1.aiService.generateExamSimulation({ subject, difficulty, numberOfQuestions, duration });
            const exam = new Exam_1.Exam({
                title: aiExam.title,
                description: aiExam.description,
                subject,
                difficulty,
                questions: aiExam.questions,
                totalPoints: aiExam.totalPoints,
                estimatedDuration: aiExam.estimatedDuration,
                metadata: { learningObjectives: [], tags: [subject, difficulty, 'exam'], aiGenerated: true, timesTaken: 0, averageScore: 0, passingScore: 60 },
                createdBy: userId,
                submissions: []
            });
            await exam.save();
            res.status(201).json({ success: true, message: 'Simulacija ispita uspešno generisana.', data: { exam } });
        }
        catch (e) {
            const mockExam = {
                _id: `mock-exam-${Date.now()}`,
                title: `Mock ${subject} ispit`,
                description: `Generisan ${subject} ispit za ${difficulty} nivo`,
                subject,
                difficulty,
                questions: Array.from({ length: numberOfQuestions }, (_, i) => ({
                    question: `Pitanje ${i + 1} za ${subject}`,
                    options: ['Opcija A', 'Opcija B', 'Opcija C', 'Opcija D'],
                    correctAnswer: 0,
                    points: 10
                })),
                totalPoints: numberOfQuestions * 10,
                estimatedDuration: duration,
                createdBy: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            res.status(201).json({ success: true, message: 'Simulacija ispita uspešno generisana (mock mode).', data: { exam: mockExam } });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Greška pri generisanju ispita. Pokušajte ponovo.' });
    }
};
exports.generateExam = generateExam;
const getExams = async (req, res) => {
    try {
        const { page = 1, limit = 10, subject, difficulty } = req.query;
        try {
            const query = { isActive: true };
            if (subject)
                query.subject = subject;
            if (difficulty)
                query.difficulty = difficulty;
            const exams = await Exam_1.Exam.find(query).sort({ createdAt: -1 }).limit(Number(limit)).skip((Number(page) - 1) * Number(limit));
            const total = await Exam_1.Exam.countDocuments(query);
            res.json({ success: true, data: { exams, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } } });
        }
        catch (e) {
            let filteredExams = mockData_1.mockExams;
            if (subject)
                filteredExams = filteredExams.filter(exam => exam.subject === subject);
            if (difficulty)
                filteredExams = filteredExams.filter(exam => exam.difficulty === difficulty);
            res.json({ success: true, data: { exams: filteredExams, pagination: { page: 1, limit: filteredExams.length, total: filteredExams.length, pages: 1 } } });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
    }
};
exports.getExams = getExams;
const getExam = async (req, res) => {
    try {
        const { id } = req.params;
        try {
            const exam = await Exam_1.Exam.findOne({ _id: id, isActive: true });
            if (!exam)
                return res.status(404).json({ success: false, message: 'Ispit nije pronađen.' });
            res.json({ success: true, data: { exam } });
        }
        catch (e) {
            const exam = mockData_1.mockExams.find(e => e._id === id);
            if (!exam)
                return res.status(404).json({ success: false, message: 'Ispit nije pronađen (mock).' });
            res.json({ success: true, data: { exam } });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
    }
};
exports.getExam = getExam;
const submitExam = async (req, res) => {
    try {
        const { id } = req.params;
        const { answers, timeSpent } = req.body;
        const userId = req.user._id;
        try {
            const exam = await Exam_1.Exam.findOne({ _id: id, isActive: true });
            if (!exam)
                return res.status(404).json({ success: false, message: 'Ispit nije pronađen.' });
            const existingSubmission = exam.submissions.find(sub => sub.userId.toString() === userId.toString());
            if (existingSubmission)
                return res.status(400).json({ success: false, message: 'Već ste položili ovaj ispit.' });
            let totalPointsEarned = 0;
            const evaluatedAnswers = answers.map((answer, index) => {
                const question = exam.questions[index];
                const isCorrect = question.correctAnswer?.toLowerCase() === answer.answer.toLowerCase();
                const pointsEarned = isCorrect ? question.points : 0;
                totalPointsEarned += pointsEarned;
                return { questionIndex: index, answer: answer.answer, isCorrect, pointsEarned };
            });
            const score = (totalPointsEarned / exam.totalPoints) * 100;
            const submission = { userId, answers: evaluatedAnswers, totalPoints: totalPointsEarned, score, timeSpent, submittedAt: new Date() };
            await exam.addSubmission(submission);
            res.json({ success: true, message: 'Ispit uspešno predat.', data: { score, totalPoints: exam.totalPoints, pointsEarned: totalPointsEarned, evaluatedAnswers } });
        }
        catch (e) {
            const exam = mockData_1.mockExams.find(e => e._id === id);
            if (!exam)
                return res.status(404).json({ success: false, message: 'Ispit nije pronađen (mock).' });
            const mockScore = Math.floor(Math.random() * 40) + 60;
            const mockPoints = Math.floor((mockScore / 100) * exam.totalPoints);
            res.json({ success: true, message: 'Ispit uspešno predat (mock mode).', data: { score: mockScore, totalPoints: exam.totalPoints, pointsEarned: mockPoints, evaluatedAnswers: [] } });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
    }
};
exports.submitExam = submitExam;
const getExamResults = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        try {
            const exam = await Exam_1.Exam.findOne({ _id: id, isActive: true });
            if (!exam)
                return res.status(404).json({ success: false, message: 'Ispit nije pronađen.' });
            const submission = exam.submissions.find(sub => sub.userId.toString() === userId.toString());
            if (!submission)
                return res.status(404).json({ success: false, message: 'Niste položili ovaj ispit.' });
            res.json({ success: true, data: { submission, exam: { title: exam.title, subject: exam.subject, totalPoints: exam.totalPoints } } });
        }
        catch (e) {
            const exam = mockData_1.mockExams.find(e => e._id === id);
            if (!exam)
                return res.status(404).json({ success: false, message: 'Ispit nije pronađen (mock).' });
            const mockSubmission = { userId, score: 85, totalPoints: 80, timeSpent: 45, submittedAt: new Date() };
            res.json({ success: true, data: { submission: mockSubmission, exam: { title: exam.title, subject: exam.subject, totalPoints: exam.totalPoints } } });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
    }
};
exports.getExamResults = getExamResults;
const getExamStats = async (req, res) => {
    try {
        const { id } = req.params;
        try {
            const exam = await Exam_1.Exam.findOne({ _id: id, isActive: true });
            if (!exam)
                return res.status(404).json({ success: false, message: 'Ispit nije pronađen.' });
            const stats = {
                totalSubmissions: exam.submissions.length,
                averageScore: exam.submissions.length > 0 ? exam.submissions.reduce((sum, sub) => sum + sub.score, 0) / exam.submissions.length : 0,
                highestScore: exam.submissions.length > 0 ? Math.max(...exam.submissions.map(sub => sub.score)) : 0,
                lowestScore: exam.submissions.length > 0 ? Math.min(...exam.submissions.map(sub => sub.score)) : 0,
                passingRate: exam.submissions.length > 0 ? (exam.submissions.filter(sub => sub.score >= 60).length / exam.submissions.length) * 100 : 0
            };
            res.json({ success: true, data: { stats, exam: { title: exam.title, subject: exam.subject } } });
        }
        catch (e) {
            const exam = mockData_1.mockExams.find(e => e._id === id);
            if (!exam)
                return res.status(404).json({ success: false, message: 'Ispit nije pronađen (mock).' });
            const mockStats = { totalSubmissions: 15, averageScore: 78.5, highestScore: 95, lowestScore: 45, passingRate: 80 };
            res.json({ success: true, data: { stats: mockStats, exam: { title: exam.title, subject: exam.subject } } });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
    }
};
exports.getExamStats = getExamStats;
//# sourceMappingURL=examController.js.map