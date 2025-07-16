import { Request, Response } from 'express';
import { Exam, IExamSubmission } from '@/models/Exam';
import { aiService } from '@/services/aiService';

interface AuthRequest extends Request {
  user?: any;
}

// AI generisanje simulacije ispita
export const generateExam = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      subject,
      difficulty = 'beginner',
      numberOfQuestions = 10,
      duration = 60
    } = req.body;
    const userId = req.user._id;

    // Generisanje ispita pomoću AI-a
    const aiExam = await aiService.generateExamSimulation({
      subject,
      difficulty,
      numberOfQuestions,
      duration
    });

    // Kreiranje ispita u bazi
    const exam = new Exam({
      title: aiExam.title,
      description: aiExam.description,
      subject,
      difficulty,
      questions: aiExam.questions,
      totalPoints: aiExam.totalPoints,
      estimatedDuration: aiExam.estimatedDuration,
      metadata: {
        learningObjectives: [],
        tags: [subject, difficulty, 'exam'],
        aiGenerated: true,
        timesTaken: 0,
        averageScore: 0,
        passingScore: 60
      },
      createdBy: userId,
      submissions: []
    });

    await exam.save();

    res.status(201).json({
      success: true,
      message: 'Simulacija ispita uspešno generisana.',
      data: { exam }
    });
  } catch (error) {
    console.error('Greška pri generisanju ispita:', error);
    res.status(500).json({
      success: false,
      message: 'Greška pri generisanju ispita. Pokušajte ponovo.'
    });
  }
};

// Dobijanje liste ispita
export const getExams = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, subject, difficulty } = req.query;

    const query: any = { isActive: true };
    if (subject) query.subject = subject;
    if (difficulty) query.difficulty = difficulty;

    const exams = await Exam.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate('createdBy', 'firstName lastName')
      .select('-questions.correctAnswer -submissions'); // Ne prikazujemo tačne odgovore

    const total = await Exam.countDocuments(query);

    res.json({
      success: true,
      data: {
        exams,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    console.error('Greška pri dobijanju ispita:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Dobijanje specifičnog ispita (bez tačnih odgovora)
export const getExam = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const exam = await Exam.findOne({ _id: id, isActive: true })
      .populate('createdBy', 'firstName lastName')
      .select('-questions.correctAnswer -submissions');

    if (!exam) {
      res.status(404).json({
        success: false,
        message: 'Ispit nije pronađen.'
      });
      return;
    }

    res.json({
      success: true,
      data: { exam }
    });
  } catch (error) {
    console.error('Greška pri dobijanju ispita:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Predavanje ispita
export const submitExam = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { answers, timeSpent } = req.body;
    const userId = req.user._id;

    const exam = await Exam.findOne({ _id: id, isActive: true });
    if (!exam) {
      res.status(404).json({
        success: false,
        message: 'Ispit nije pronađen.'
      });
      return;
    }

    // Provera da li je korisnik već položio ovaj ispit
    const existingSubmission = exam.submissions.find(sub => 
      sub.userId.toString() === userId.toString()
    );

    if (existingSubmission) {
      res.status(400).json({
        success: false,
        message: 'Već ste položili ovaj ispit.'
      });
      return;
    }

    // Evaluacija odgovora
    let totalPointsEarned = 0;
    const evaluatedAnswers = answers.map((answer: any, index: number) => {
      const question = exam.questions[index];
      const isCorrect = question.correctAnswer?.toLowerCase() === answer.answer.toLowerCase();
      const pointsEarned = isCorrect ? question.points : 0;
      totalPointsEarned += pointsEarned;

      return {
        questionIndex: index,
        answer: answer.answer,
        isCorrect,
        pointsEarned
      };
    });

    const score = (totalPointsEarned / exam.totalPoints) * 100;

    // Kreiranje submission-a
    const submission: IExamSubmission = {
      userId,
      answers: evaluatedAnswers,
      totalPoints: totalPointsEarned,
      score,
      timeSpent,
      submittedAt: new Date()
    };

    // Dodavanje submission-a u ispit
    await exam.addSubmission(submission);

    res.json({
      success: true,
      message: 'Ispit uspešno predat.',
      data: {
        score,
        totalPoints: exam.totalPoints,
        pointsEarned: totalPointsEarned,
        isPassed: exam.isPassed(score),
        timeSpent,
        answers: evaluatedAnswers
      }
    });
  } catch (error) {
    console.error('Greška pri predavanju ispita:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Dobijanje rezultata ispita
export const getExamResults = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const exam = await Exam.findOne({ _id: id, isActive: true });
    if (!exam) {
      res.status(404).json({
        success: false,
        message: 'Ispit nije pronađen.'
      });
      return;
    }

    const submission = exam.submissions.find(sub => 
      sub.userId.toString() === userId.toString()
    );

    if (!submission) {
      res.status(404).json({
        success: false,
        message: 'Niste položili ovaj ispit.'
      });
      return;
    }

    // Dobijanje detalja o pitanjima sa tačnim odgovorima
    const detailedAnswers = submission.answers.map(answer => {
      const question = exam.questions[answer.questionIndex];
      return {
        ...answer,
        question: question.question,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        maxPoints: question.points
      };
    });

    res.json({
      success: true,
      data: {
        submission: {
          ...submission,
          answers: detailedAnswers
        },
        examStats: exam.getStats(),
        isPassed: exam.isPassed(submission.score)
      }
    });
  } catch (error) {
    console.error('Greška pri dobijanju rezultata:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Dobijanje statistike ispita (za nastavnike)
export const getExamStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const exam = await Exam.findOne({ _id: id, isActive: true, createdBy: userId });
    if (!exam) {
      res.status(404).json({
        success: false,
        message: 'Ispit nije pronađen.'
      });
      return;
    }

    const stats = exam.getStats();

    res.json({
      success: true,
      data: {
        exam: {
          title: exam.title,
          subject: exam.subject,
          difficulty: exam.difficulty,
          questionCount: exam.questionCount,
          totalPoints: exam.totalPoints,
          estimatedDuration: exam.estimatedDuration
        },
        stats
      }
    });
  } catch (error) {
    console.error('Greška pri dobijanju statistike:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
}; 