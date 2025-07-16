"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exam = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const examQuestionSchema = new mongoose_1.Schema({
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
const examSubmissionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
const examSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
examSchema.index({ subject: 1, difficulty: 1 });
examSchema.index({ createdBy: 1, createdAt: -1 });
examSchema.index({ 'metadata.tags': 1 });
examSchema.virtual('questionCount').get(function () {
    return this.questions.length;
});
examSchema.methods.addSubmission = function (submission) {
    this.submissions.push(submission);
    this.metadata.timesTaken += 1;
    const totalScore = this.submissions.reduce((sum, sub) => sum + sub.score, 0);
    this.metadata.averageScore = totalScore / this.submissions.length;
    return this.save();
};
examSchema.methods.isPassed = function (score) {
    return score >= this.metadata.passingScore;
};
examSchema.methods.getStats = function () {
    const totalSubmissions = this.submissions.length;
    const passedSubmissions = this.submissions.filter((sub) => this.isPassed(sub.score)).length;
    return {
        totalSubmissions,
        passedSubmissions,
        passRate: totalSubmissions > 0 ? (passedSubmissions / totalSubmissions) * 100 : 0,
        averageScore: this.metadata.averageScore,
        averageTimeSpent: totalSubmissions > 0
            ? this.submissions.reduce((sum, sub) => sum + sub.timeSpent, 0) / totalSubmissions
            : 0
    };
};
exports.Exam = mongoose_1.default.model('Exam', examSchema);
//# sourceMappingURL=Exam.js.map