export declare const mockUsers: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    fullName: string;
    preferences: {};
    learningProgress: {};
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}[];
export declare const mockChats: {
    _id: string;
    userId: string;
    title: string;
    messages: {
        role: string;
        content: string;
        timestamp: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}[];
export declare const mockProblems: {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    subject: string;
    category: string;
    solution: string;
    explanation: string;
    createdAt: Date;
    updatedAt: Date;
}[];
export declare const mockExams: {
    _id: string;
    title: string;
    description: string;
    subject: string;
    duration: number;
    questions: {
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}[];
export declare const mockCareerPaths: {
    id: string;
    title: string;
    description: string;
    skills: string[];
    salary: string;
    demand: string;
    education: string;
}[];
export declare const mockLearningPaths: {
    id: string;
    title: string;
    description: string;
    steps: {
        step: number;
        title: string;
        duration: string;
        description: string;
    }[];
    totalDuration: string;
    difficulty: string;
}[];
export declare const mockAIResponses: {
    chat: string[];
    problemGeneration: string[];
    careerAdvice: string[];
};
export declare const getMockUserById: (id: string) => {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    fullName: string;
    preferences: {};
    learningProgress: {};
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
} | undefined;
export declare const getMockUserByEmail: (email: string) => {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    fullName: string;
    preferences: {};
    learningProgress: {};
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
} | undefined;
export declare const getMockChatsByUserId: (userId: string) => {
    _id: string;
    userId: string;
    title: string;
    messages: {
        role: string;
        content: string;
        timestamp: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}[];
export declare const getMockProblems: () => {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    subject: string;
    category: string;
    solution: string;
    explanation: string;
    createdAt: Date;
    updatedAt: Date;
}[];
export declare const getMockExams: () => {
    _id: string;
    title: string;
    description: string;
    subject: string;
    duration: number;
    questions: {
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}[];
export declare const getRandomAIResponse: (type: keyof typeof mockAIResponses) => string;
//# sourceMappingURL=mockData.d.ts.map