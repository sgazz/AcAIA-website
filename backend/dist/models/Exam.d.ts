import mongoose, { Document } from 'mongoose';
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
    score: number;
    timeSpent: number;
    submittedAt: Date;
}
export interface IExam extends Document {
    title: string;
    description: string;
    subject: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    questions: IExamQuestion[];
    totalPoints: number;
    estimatedDuration: number;
    metadata: {
        learningObjectives: string[];
        tags: string[];
        aiGenerated: boolean;
        timesTaken: number;
        averageScore: number;
        passingScore: number;
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
export declare const Exam: mongoose.Model<IExam, {}, {}, {}, mongoose.Document<unknown, {}, IExam, {}> & IExam & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Exam.d.ts.map