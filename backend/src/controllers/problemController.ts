import { Request, Response } from 'express';
import { Problem } from '../models/Problem';
import { aiService } from '../services/aiService';
import { getMockProblems, getRandomAIResponse } from '../utils/mockData';

interface AuthRequest extends Request {
  user?: any;
}

// AI generisanje problema
export const generateProblem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      subject,
      difficulty = 'beginner',
      type = 'multiple-choice',
      learningObjectives = []
    } = req.body;
    const userId = req.user._id;

    // Generisanje problema pomoću AI-a
    const aiProblem = await aiService.generateProblem({
      subject,
      difficulty,
      type,
      learningObjectives
    });

    // Kreiranje problema u bazi
    const problem = new Problem({
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
  } catch (error) {
    console.error('Greška pri generisanju problema:', error);
    res.status(500).json({
      success: false,
      message: 'Greška pri generisanju problema. Pokušajte ponovo.'
    });
  }
};

// Dobijanje liste problema
export const getProblems = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, subject, difficulty, type } = req.query;

    // Koristi mock podatke
    let problems = getMockProblems();
    
    // Filtriranje po parametrima
    if (subject) {
      problems = problems.filter(problem => problem.subject === subject);
    }
    if (difficulty) {
      problems = problems.filter(problem => problem.difficulty === difficulty);
    }
    if (type) {
      problems = problems.filter(problem => problem.category === type);
    }

    // Paginacija
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
  } catch (error) {
    console.error('Greška pri dobijanju problema:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Dobijanje specifičnog problema
export const getProblem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const problem = await Problem.findOne({ _id: id, isActive: true })
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
  } catch (error) {
    console.error('Greška pri dobijanju problema:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Rešavanje problema
export const solveProblem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { answer } = req.body;
    const userId = req.user._id;

    const problem = await Problem.findOne({ _id: id, isActive: true });
    if (!problem) {
      res.status(404).json({
        success: false,
        message: 'Problem nije pronađen.'
      });
      return;
    }

    // Provera odgovora
    const isCorrect = problem.content.correctAnswer?.toLowerCase() === answer.toLowerCase();
    
    // Ažuriranje statistike
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
  } catch (error) {
    console.error('Greška pri rešavanju problema:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Ocena problema
export const rateProblem = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const problem = await Problem.findOne({ _id: id, isActive: true });
    if (!problem) {
      res.status(404).json({
        success: false,
        message: 'Problem nije pronađen.'
      });
      return;
    }

    // Ažuriranje ocene
    await problem.addRating(rating);

    res.json({
      success: true,
      message: 'Ocena uspešno dodata.',
      data: {
        newRating: problem.metadata.rating
      }
    });
  } catch (error) {
    console.error('Greška pri ocenjivanju problema:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Kreiranje custom problema
export const createProblem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      subject,
      difficulty,
      type,
      content,
      learningObjectives = [],
      tags = []
    } = req.body;
    const userId = req.user._id;

    const problem = new Problem({
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
  } catch (error) {
    console.error('Greška pri kreiranju problema:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
}; 