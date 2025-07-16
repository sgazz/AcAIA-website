import mongoose, { Document } from 'mongoose';
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
        estimatedTime: number;
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
export declare const Problem: mongoose.Model<IProblem, {}, {}, {}, mongoose.Document<unknown, {}, IProblem, {}> & IProblem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Problem.d.ts.map