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
exports.Problem = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const testCaseSchema = new mongoose_1.Schema({
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
const problemSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
problemSchema.index({ subject: 1, difficulty: 1 });
problemSchema.index({ 'metadata.tags': 1 });
problemSchema.index({ createdBy: 1, createdAt: -1 });
problemSchema.index({ 'metadata.rating': -1 });
problemSchema.virtual('complexity').get(function () {
    const baseComplexity = this.difficulty === 'beginner' ? 1 : this.difficulty === 'intermediate' ? 2 : 3;
    return baseComplexity * (this.metadata.estimatedTime / 15);
});
problemSchema.methods.updateStats = function (isCorrect) {
    this.metadata.timesAttempted += 1;
    if (isCorrect) {
        const currentSuccess = this.metadata.successRate * (this.metadata.timesAttempted - 1);
        this.metadata.successRate = (currentSuccess + 1) / this.metadata.timesAttempted * 100;
    }
    else {
        const currentSuccess = this.metadata.successRate * (this.metadata.timesAttempted - 1);
        this.metadata.successRate = currentSuccess / this.metadata.timesAttempted * 100;
    }
    return this.save();
};
problemSchema.methods.addRating = function (newRating) {
    const currentTotal = this.metadata.rating * this.metadata.timesAttempted;
    this.metadata.rating = (currentTotal + newRating) / (this.metadata.timesAttempted + 1);
    return this.save();
};
exports.Problem = mongoose_1.default.model('Problem', problemSchema);
//# sourceMappingURL=Problem.js.map