import mongoose, { Document, Schema } from 'mongoose';

export interface IExamQuestion {
  question: string;
  type: 'multiple-choice' | 'open-ended';
  options?: string[];
  correctAnswer?: string;
  points: number;
  explanation?: string;
}

export interface IExamSubmission {
  userId: mongoose.Types.ObjectId;
  answers: Array<{
    questionIndex: number;
    answer: string;
    isCorrect?: boolean;
    pointsEarned: number;
  }>;
  totalPoints: number;
  score: number; // procenat
  timeSpent: number; // u minutima
  submittedAt: Date;
}

export interface IExam extends Document {
  title: string;
  description: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: IExamQuestion[];
  totalPoints: number;
  estimatedDuration: number; // u minutima
  metadata: {
    learningObjectives: string[];
    tags: string[];
    aiGenerated: boolean;
    timesTaken: number;
    averageScore: number;
    passingScore: number; // procenat za prolaz
  };
  createdBy: mongoose.Types.ObjectId;
  isActive: boolean;
  submissions: IExamSubmission[];
  createdAt: Date;
  updatedAt: Date;
  questionCount: number;
  addSubmission(submission: IExamSubmission): Promise<IExam>;
  isPassed(score: number): boolean;
  getStats(): {
    totalSubmissions: number;
    passedSubmissions: number;
    passRate: number;
    averageScore: number;
    averageTimeSpent: number;
  };
}

const examQuestionSchema = new Schema<IExamQuestion>({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'open-ended'],
    required: true
  },
  options: [{
    type: String,
    trim: true
  }],
  correctAnswer: String,
  points: {
    type: Number,
    required: true,
    min: 1
  },
  explanation: String
});

const examSubmissionSchema = new Schema<IExamSubmission>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    questionIndex: {
      type: Number,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    isCorrect: Boolean,
    pointsEarned: {
      type: Number,
      default: 0
    }
  }],
  totalPoints: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  timeSpent: {
    type: Number,
    required: true,
    min: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const examSchema = new Schema<IExam>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [200, 'Naslov ne može biti duži od 200 karaktera']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  questions: [examQuestionSchema],
  totalPoints: {
    type: Number,
    required: true,
    min: 1
  },
  estimatedDuration: {
    type: Number,
    required: true,
    min: 1
  },
  metadata: {
    learningObjectives: [{
      type: String,
      trim: true
    }],
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    aiGenerated: {
      type: Boolean,
      default: false
    },
    timesTaken: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    passingScore: {
      type: Number,
      default: 60,
      min: 0,
      max: 100
    }
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  submissions: [examSubmissionSchema]
}, {
  timestamps: true
});

// Indexi za brže pretraživanje
examSchema.index({ subject: 1, difficulty: 1 });
examSchema.index({ createdBy: 1, createdAt: -1 });
examSchema.index({ 'metadata.tags': 1 });

// Virtual za broj pitanja
examSchema.virtual('questionCount').get(function() {
  return this.questions.length;
});

// Metoda za dodavanje submission-a
examSchema.methods.addSubmission = function(submission: IExamSubmission) {
  this.submissions.push(submission);
  this.metadata.timesTaken += 1;
  
  // Ažuriranje prosečne ocene
  const totalScore = this.submissions.reduce((sum: number, sub: IExamSubmission) => sum + sub.score, 0);
  this.metadata.averageScore = totalScore / this.submissions.length;
  
  return this.save();
};

// Metoda za proveru da li je korisnik položio ispit
examSchema.methods.isPassed = function(score: number): boolean {
  return score >= this.metadata.passingScore;
};

// Metoda za dobijanje statistike ispita
examSchema.methods.getStats = function() {
  const totalSubmissions = this.submissions.length;
  const passedSubmissions = this.submissions.filter((sub: IExamSubmission) => 
    this.isPassed(sub.score)
  ).length;
  
  return {
    totalSubmissions,
    passedSubmissions,
    passRate: totalSubmissions > 0 ? (passedSubmissions / totalSubmissions) * 100 : 0,
    averageScore: this.metadata.averageScore,
    averageTimeSpent: totalSubmissions > 0 
      ? this.submissions.reduce((sum: number, sub: IExamSubmission) => sum + sub.timeSpent, 0) / totalSubmissions 
      : 0
  };
};

export const Exam = mongoose.model<IExam>('Exam', examSchema); 