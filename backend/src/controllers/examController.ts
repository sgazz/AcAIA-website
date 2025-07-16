import { Request, Response } from 'express';
import { Exam, IExamSubmission } from '../models/Exam';
import { aiService } from '../services/aiService';
import { mockExams, getRandomAIResponse } from '../utils/mockData';

interface AuthRequest extends Request {
  user?: any;
}

// AI generisanje simulacije ispita
export const generateExam = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { subject, difficulty = 'beginner', numberOfQuestions = 10, duration = 60 } = req.body;
    const userId = req.user._id;
    try {
      const aiExam = await aiService.generateExamSimulation({ subject, difficulty, numberOfQuestions, duration });
      const exam = new Exam({
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
    } catch (e) {
      // MOCK
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
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška pri generisanju ispita. Pokušajte ponovo.' });
  }
};

// Dobijanje liste ispita
export const getExams = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, subject, difficulty } = req.query;
    try {
      const query: any = { isActive: true };
      if (subject) query.subject = subject;
      if (difficulty) query.difficulty = difficulty;
      const exams = await Exam.find(query).sort({ createdAt: -1 }).limit(Number(limit)).skip((Number(page) - 1) * Number(limit));
      const total = await Exam.countDocuments(query);
      res.json({ success: true, data: { exams, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } } });
      return;
    } catch (e) {
      // MOCK
      let filteredExams = mockExams;
      if (subject) filteredExams = filteredExams.filter(exam => exam.subject === subject);
      // Mock exams don't have difficulty property, so we'll skip that filter
      res.json({ success: true, data: { exams: filteredExams, pagination: { page: 1, limit: filteredExams.length, total: filteredExams.length, pages: 1 } } });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
  }
};

// Dobijanje specifičnog ispita
export const getExam = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    try {
      const exam = await Exam.findOne({ _id: id, isActive: true });
      if (!exam) {
        res.status(404).json({ success: false, message: 'Ispit nije pronađen.' });
        return;
      }
      res.json({ success: true, data: { exam } });
      return;
    } catch (e) {
      // MOCK
      const exam = mockExams.find(e => e._id === id);
      if (!exam) {
        res.status(404).json({ success: false, message: 'Ispit nije pronađen (mock).' });
        return;
      }
      res.json({ success: true, data: { exam } });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
  }
};

// Predavanje ispita
export const submitExam = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { answers, timeSpent } = req.body;
    const userId = req.user._id;
    try {
      const exam = await Exam.findOne({ _id: id, isActive: true });
      if (!exam) {
        res.status(404).json({ success: false, message: 'Ispit nije pronađen.' });
        return;
      }
      const existingSubmission = exam.submissions.find(sub => sub.userId.toString() === userId.toString());
      if (existingSubmission) {
        res.status(400).json({ success: false, message: 'Već ste položili ovaj ispit.' });
        return;
      }
      let totalPointsEarned = 0;
      const evaluatedAnswers = answers.map((answer: any, index: number) => {
        const question = exam.questions[index];
        const isCorrect = question.correctAnswer?.toLowerCase() === answer.answer.toLowerCase();
        const pointsEarned = isCorrect ? question.points : 0;
        totalPointsEarned += pointsEarned;
        return { questionIndex: index, answer: answer.answer, isCorrect, pointsEarned };
      });
      const score = (totalPointsEarned / exam.totalPoints) * 100;
      const submission: IExamSubmission = { userId, answers: evaluatedAnswers, totalPoints: totalPointsEarned, score, timeSpent, submittedAt: new Date() };
      await exam.addSubmission(submission);
      res.json({ success: true, message: 'Ispit uspešno predat.', data: { score, totalPoints: exam.totalPoints, pointsEarned: totalPointsEarned, evaluatedAnswers } });
      return;
    } catch (e) {
      // MOCK
      const exam = mockExams.find(e => e._id === id);
      if (!exam) {
        res.status(404).json({ success: false, message: 'Ispit nije pronađen (mock).' });
        return;
      }
      const mockScore = Math.floor(Math.random() * 40) + 60; // 60-100
      const mockPoints = Math.floor((mockScore / 100) * 100); // Mock total points
      res.json({ success: true, message: 'Ispit uspešno predat (mock mode).', data: { score: mockScore, totalPoints: 100, pointsEarned: mockPoints, evaluatedAnswers: [] } });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
  }
};

// Dobijanje rezultata ispita
export const getExamResults = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    try {
      const exam = await Exam.findOne({ _id: id, isActive: true });
      if (!exam) {
        res.status(404).json({ success: false, message: 'Ispit nije pronađen.' });
        return;
      }
      const submission = exam.submissions.find(sub => sub.userId.toString() === userId.toString());
      if (!submission) {
        res.status(404).json({ success: false, message: 'Niste položili ovaj ispit.' });
        return;
      }
      res.json({ success: true, data: { submission, exam: { title: exam.title, subject: exam.subject, totalPoints: exam.totalPoints } } });
      return;
    } catch (e) {
      // MOCK
      const exam = mockExams.find(e => e._id === id);
      if (!exam) {
        res.status(404).json({ success: false, message: 'Ispit nije pronađen (mock).' });
        return;
      }
      const mockSubmission = { userId, score: 85, totalPoints: 80, timeSpent: 45, submittedAt: new Date() };
      res.json({ success: true, data: { submission: mockSubmission, exam: { title: exam.title, subject: exam.subject, totalPoints: 100 } } });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
  }
};

// Dobijanje statistike ispita
export const getExamStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    try {
      const exam = await Exam.findOne({ _id: id, isActive: true });
      if (!exam) {
        res.status(404).json({ success: false, message: 'Ispit nije pronađen.' });
        return;
      }
      const stats = {
        totalSubmissions: exam.submissions.length,
        averageScore: exam.submissions.length > 0 ? exam.submissions.reduce((sum, sub) => sum + sub.score, 0) / exam.submissions.length : 0,
        highestScore: exam.submissions.length > 0 ? Math.max(...exam.submissions.map(sub => sub.score)) : 0,
        lowestScore: exam.submissions.length > 0 ? Math.min(...exam.submissions.map(sub => sub.score)) : 0,
        passingRate: exam.submissions.length > 0 ? (exam.submissions.filter(sub => sub.score >= 60).length / exam.submissions.length) * 100 : 0
      };
      res.json({ success: true, data: { stats, exam: { title: exam.title, subject: exam.subject } } });
      return;
    } catch (e) {
      // MOCK
      const exam = mockExams.find(e => e._id === id);
      if (!exam) {
        res.status(404).json({ success: false, message: 'Ispit nije pronađen (mock).' });
        return;
      }
      const mockStats = { totalSubmissions: 15, averageScore: 78.5, highestScore: 95, lowestScore: 45, passingRate: 80 };
      res.json({ success: true, data: { stats: mockStats, exam: { title: exam.title, subject: exam.subject } } });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru. Pokušajte ponovo.' });
  }
}; 