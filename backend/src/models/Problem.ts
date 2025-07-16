import mongoose, { Document, Schema } from 'mongoose';

export interface IProblem extends Document {
  title: string;
  description: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'multiple-choice' | 'open-ended' | 'coding' | 'essay';
  content: {
    question: string;
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
    hints?: string[];
    codeTemplate?: string;
    testCases?: Array<{
      input: string;
      output: string;
      description?: string;
    }>;
  };
  metadata: {
    learningObjectives: string[];
    estimatedTime: number; // u minutima
    tags: string[];
    aiGenerated: boolean;
    rating: number;
    timesAttempted: number;
    successRate: number;
  };
  createdBy: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  complexity: number;
  updateStats(isCorrect: boolean): Promise<IProblem>;
  addRating(newRating: number): Promise<IProblem>;
}

const testCaseSchema = new Schema({
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  description: String
});

const problemSchema = new Schema<IProblem>({
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
  type: {
    type: String,
    enum: ['multiple-choice', 'open-ended', 'coding', 'essay'],
    required: true
  },
  content: {
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      trim: true
    }],
    correctAnswer: String,
    explanation: String,
    hints: [{
      type: String,
      trim: true
    }],
    codeTemplate: String,
    testCases: [testCaseSchema]
  },
  metadata: {
    learningObjectives: [{
      type: String,
      trim: true
    }],
    estimatedTime: {
      type: Number,
      default: 15,
      min: 1
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    aiGenerated: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    timesAttempted: {
      type: Number,
      default: 0
    },
    successRate: {
      type: Number,
      default: 0,
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
  }
}, {
  timestamps: true
});

// Indexi za brže pretraživanje
problemSchema.index({ subject: 1, difficulty: 1 });
problemSchema.index({ 'metadata.tags': 1 });
problemSchema.index({ createdBy: 1, createdAt: -1 });
problemSchema.index({ 'metadata.rating': -1 });

// Virtual za kompleksnost
problemSchema.virtual('complexity').get(function() {
  const baseComplexity = this.difficulty === 'beginner' ? 1 : this.difficulty === 'intermediate' ? 2 : 3;
  return baseComplexity * (this.metadata.estimatedTime / 15);
});

// Metoda za ažuriranje statistike
problemSchema.methods.updateStats = function(isCorrect: boolean) {
  this.metadata.timesAttempted += 1;
  
  if (isCorrect) {
    const currentSuccess = this.metadata.successRate * (this.metadata.timesAttempted - 1);
    this.metadata.successRate = (currentSuccess + 1) / this.metadata.timesAttempted * 100;
  } else {
    const currentSuccess = this.metadata.successRate * (this.metadata.timesAttempted - 1);
    this.metadata.successRate = currentSuccess / this.metadata.timesAttempted * 100;
  }
  
  return this.save();
};

// Metoda za dodavanje ocene
problemSchema.methods.addRating = function(newRating: number) {
  const currentTotal = this.metadata.rating * this.metadata.timesAttempted;
  this.metadata.rating = (currentTotal + newRating) / (this.metadata.timesAttempted + 1);
  return this.save();
};

export const Problem = mongoose.model<IProblem>('Problem', problemSchema); 