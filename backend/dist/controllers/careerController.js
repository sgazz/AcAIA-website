"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLearningPath = exports.assessSkills = exports.getCareerPaths = exports.generateCareerAdvice = void 0;
const aiService_1 = require("../services/aiService");
const mockData_1 = require("../utils/mockData");
const generateCareerAdvice = async (req, res) => {
    try {
        const { currentSkills = [], interests = [], experience = '', goals = '' } = req.body;
        const userId = req.user._id;
        const careerAdvice = await aiService_1.aiService.generateCareerAdvice({
            currentSkills,
            interests,
            experience,
            goals
        });
        res.json({
            success: true,
            message: 'Karijerni savet uspešno generisan.',
            data: {
                advice: careerAdvice,
                userId,
                generatedAt: new Date()
            }
        });
    }
    catch (error) {
        console.error('Greška pri generisanju karijernog saveta:', error);
        res.status(500).json({
            success: false,
            message: 'Greška pri generisanju karijernog saveta. Pokušajte ponovo.'
        });
    }
};
exports.generateCareerAdvice = generateCareerAdvice;
const getCareerPaths = async (req, res) => {
    try {
        const { subject, difficulty } = req.query;
        let filteredPaths = mockData_1.mockCareerPaths;
        if (subject) {
            filteredPaths = filteredPaths.filter(path => path.skills.some(skill => skill.toLowerCase().includes(subject)));
        }
        if (difficulty) {
        }
        res.json({
            success: true,
            data: {
                careerPaths: filteredPaths,
                total: filteredPaths.length
            }
        });
    }
    catch (error) {
        console.error('Greška pri dobijanju karijernih putova:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.getCareerPaths = getCareerPaths;
const assessSkills = async (req, res) => {
    try {
        const { skills, experience, education } = req.body;
        const userId = req.user._id;
        const assessment = {
            technicalSkills: {
                programming: skills.includes('programming') ? Math.min(experience * 10, 100) : 0,
                design: skills.includes('design') ? Math.min(experience * 8, 100) : 0,
                analysis: skills.includes('analysis') ? Math.min(experience * 12, 100) : 0,
                communication: Math.min(experience * 15, 100),
                problemSolving: Math.min(experience * 20, 100)
            },
            overallScore: 0,
            recommendations: [],
            careerMatches: []
        };
        const skillScores = Object.values(assessment.technicalSkills);
        assessment.overallScore = skillScores.reduce((sum, score) => sum + score, 0) / skillScores.length;
        if (assessment.technicalSkills.programming > 70) {
            assessment.recommendations.push('Razmotrite karijeru u software development-u');
            assessment.careerMatches.push('Software Developer', 'Full Stack Developer');
        }
        if (assessment.technicalSkills.design > 70) {
            assessment.recommendations.push('Razmotrite karijeru u web design-u');
            assessment.careerMatches.push('Web Designer', 'UI/UX Designer');
        }
        if (assessment.technicalSkills.analysis > 70) {
            assessment.recommendations.push('Razmotrite karijeru u data science-u');
            assessment.careerMatches.push('Data Analyst', 'Data Scientist');
        }
        if (assessment.recommendations.length === 0) {
            assessment.recommendations.push('Fokusirajte se na razvoj osnovnih veština');
            assessment.recommendations.push('Počnite sa osnovama programiranja ili dizajna');
        }
        res.json({
            success: true,
            message: 'Procena veština uspešno završena.',
            data: {
                assessment,
                userId,
                assessedAt: new Date()
            }
        });
    }
    catch (error) {
        console.error('Greška pri proceni veština:', error);
        res.status(500).json({
            success: false,
            message: 'Greška pri proceni veština. Pokušajte ponovo.'
        });
    }
};
exports.assessSkills = assessSkills;
const getLearningPath = async (req, res) => {
    try {
        const { careerPath, currentLevel = 'beginner' } = req.query;
        const path = mockData_1.mockLearningPaths.find(p => p.id === careerPath);
        if (!path) {
            res.status(404).json({
                success: false,
                message: 'Karijerni put nije pronađen.'
            });
            return;
        }
        res.json({
            success: true,
            data: {
                careerPath,
                currentLevel,
                learningPath: path,
                totalSteps: path.steps.length,
                estimatedDuration: path.totalDuration
            }
        });
    }
    catch (error) {
        console.error('Greška pri dobijanju learning path-a:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.getLearningPath = getLearningPath;
//# sourceMappingURL=careerController.js.map