"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProblem = exports.rateProblem = exports.solveProblem = exports.getProblem = exports.getProblems = exports.generateProblem = void 0;
const Problem_1 = require("../models/Problem");
const aiService_1 = require("../services/aiService");
const mockData_1 = require("../utils/mockData");
const generateProblem = async (req, res) => {
    try {
        const { subject, difficulty = 'beginner', type = 'multiple-choice', learningObjectives = [] } = req.body;
        const userId = req.user._id;
        const aiProblem = await aiService_1.aiService.generateProblem({
            subject,
            difficulty,
            type,
            learningObjectives
        });
        const problem = new Problem_1.Problem({
            title: aiProblem.title,
            description: aiProblem.description,
            subject,
            difficulty,
            type,
            content: {
                question: aiProblem.question,
                options: aiProblem.options,
                correctAnswer: aiProblem.correctAnswer,
                explanation: aiProblem.explanation,
                hints: aiProblem.hints
            },
            metadata: {
                learningObjectives,
                estimatedTime: aiProblem.estimatedTime,
                tags: [subject, difficulty, type],
                aiGenerated: true,
                rating: 0,
                timesAttempted: 0,
                successRate: 0
            },
            createdBy: userId
        });
        await problem.save();
        res.status(201).json({
            success: true,
            message: 'Problem uspešno generisan.',
            data: { problem }
        });
    }
    catch (error) {
        console.error('Greška pri generisanju problema:', error);
        res.status(500).json({
            success: false,
            message: 'Greška pri generisanju problema. Pokušajte ponovo.'
        });
    }
};
exports.generateProblem = generateProblem;
const getProblems = async (req, res) => {
    try {
        const { page = 1, limit = 10, subject, difficulty, type } = req.query;
        let problems = (0, mockData_1.getMockProblems)();
        if (subject) {
            problems = problems.filter(problem => problem.subject === subject);
        }
        if (difficulty) {
            problems = problems.filter(problem => problem.difficulty === difficulty);
        }
        if (type) {
            problems = problems.filter(problem => problem.category === type);
        }
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        const paginatedProblems = problems.slice(startIndex, endIndex);
        res.json({
            success: true,
            data: {
                problems: paginatedProblems,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total: problems.length,
                    pages: Math.ceil(problems.length / limitNum)
                }
            }
        });
    }
    catch (error) {
        console.error('Greška pri dobijanju problema:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.getProblems = getProblems;
const getProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem_1.Problem.findOne({ _id: id, isActive: true })
            .populate('createdBy', 'firstName lastName');
        if (!problem) {
            res.status(404).json({
                success: false,
                message: 'Problem nije pronađen.'
            });
            return;
        }
        res.json({
            success: true,
            data: { problem }
        });
    }
    catch (error) {
        console.error('Greška pri dobijanju problema:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.getProblem = getProblem;
const solveProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;
        const userId = req.user._id;
        const problem = await Problem_1.Problem.findOne({ _id: id, isActive: true });
        if (!problem) {
            res.status(404).json({
                success: false,
                message: 'Problem nije pronađen.'
            });
            return;
        }
        const isCorrect = problem.content.correctAnswer?.toLowerCase() === answer.toLowerCase();
        await problem.updateStats(isCorrect);
        res.json({
            success: true,
            message: isCorrect ? 'Tačan odgovor!' : 'Netičan odgovor.',
            data: {
                isCorrect,
                correctAnswer: problem.content.correctAnswer,
                explanation: problem.content.explanation,
                hints: problem.content.hints,
                updatedStats: {
                    timesAttempted: problem.metadata.timesAttempted + 1,
                    successRate: problem.metadata.successRate
                }
            }
        });
    }
    catch (error) {
        console.error('Greška pri rešavanju problema:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.solveProblem = solveProblem;
const rateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;
        const userId = req.user._id;
        if (rating < 1 || rating > 5) {
            res.status(400).json({
                success: false,
                message: 'Ocena mora biti između 1 i 5.'
            });
            return;
        }
        const problem = await Problem_1.Problem.findOne({ _id: id, isActive: true });
        if (!problem) {
            res.status(404).json({
                success: false,
                message: 'Problem nije pronađen.'
            });
            return;
        }
        await problem.addRating(rating);
        res.json({
            success: true,
            message: 'Ocena uspešno dodata.',
            data: {
                newRating: problem.metadata.rating
            }
        });
    }
    catch (error) {
        console.error('Greška pri ocenjivanju problema:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.rateProblem = rateProblem;
const createProblem = async (req, res) => {
    try {
        const { title, description, subject, difficulty, type, content, learningObjectives = [], tags = [] } = req.body;
        const userId = req.user._id;
        const problem = new Problem_1.Problem({
            title,
            description,
            subject,
            difficulty,
            type,
            content,
            metadata: {
                learningObjectives,
                estimatedTime: content.estimatedTime || 15,
                tags: [...tags, subject, difficulty, type],
                aiGenerated: false,
                rating: 0,
                timesAttempted: 0,
                successRate: 0
            },
            createdBy: userId
        });
        await problem.save();
        res.status(201).json({
            success: true,
            message: 'Problem uspešno kreiran.',
            data: { problem }
        });
    }
    catch (error) {
        console.error('Greška pri kreiranju problema:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.createProblem = createProblem;
//# sourceMappingURL=problemController.js.map