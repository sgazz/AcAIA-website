import mongoose, { Document } from 'mongoose';
export interface IMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    metadata?: {
        subject?: string;
        difficulty?: string;
        learningObjective?: string;
    };
}
export interface IChat extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    subject: string;
    messages: IMessage[];
    isActive: boolean;
    lastActivity: Date;
    metadata: {
        totalTokens: number;
        learningObjectives: string[];
        difficulty: 'beginner' | 'intermediate' | 'advanced';
        estimatedDuration: number;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const Chat: mongoose.Model<IChat, {}, {}, {}, mongoose.Document<unknown, {}, IChat, {}> & IChat & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Chat.d.ts.map