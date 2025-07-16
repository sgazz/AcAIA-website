import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'student' | 'teacher' | 'admin';
    isActive: boolean;
    profilePicture?: string;
    preferences: {
        language: string;
        theme: 'light' | 'dark';
        notifications: boolean;
    };
    learningProgress: {
        subjects: Array<{
            name: string;
            level: 'beginner' | 'intermediate' | 'advanced';
            progress: number;
            lastActivity: Date;
        }>;
        totalStudyTime: number;
        completedLessons: number;
    };
    createdAt: Date;
    updatedAt: Date;
    fullName: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map