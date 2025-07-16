declare class AIService {
    private openai;
    constructor();
    generateChatResponse(messages: Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
    }>, context?: {
        subject?: string;
        difficulty?: string;
        learningObjective?: string;
    }): Promise<{
        content: string;
        tokens: number;
    }>;
    generateProblem(params: {
        subject: string;
        difficulty: 'beginner' | 'intermediate' | 'advanced';
        type: 'multiple-choice' | 'open-ended' | 'coding' | 'essay';
        learningObjectives: string[];
    }): Promise<{
        title: string;
        description: string;
        question: string;
        options?: string[];
        correctAnswer?: string;
        explanation?: string;
        hints: string[];
        estimatedTime: number;
    }>;
    generateExamSimulation(params: {
        subject: string;
        difficulty: 'beginner' | 'intermediate' | 'advanced';
        numberOfQuestions: number;
        duration: number;
    }): Promise<{
        title: string;
        description: string;
        questions: Array<{
            question: string;
            type: 'multiple-choice' | 'open-ended';
            options?: string[];
            correctAnswer?: string;
            points: number;
        }>;
        totalPoints: number;
        estimatedDuration: number;
    }>;
    generateCareerAdvice(params: {
        currentSkills: string[];
        interests: string[];
        experience: string;
        goals: string;
    }): Promise<{
        analysis: string;
        recommendations: string[];
        learningPath: Array<{
            skill: string;
            priority: 'high' | 'medium' | 'low';
            estimatedTime: string;
            resources: string[];
        }>;
        nextSteps: string[];
    }>;
    private buildSystemPrompt;
    private buildProblemGenerationPrompt;
    private buildExamSimulationPrompt;
    private buildCareerAdvicePrompt;
}
export declare const aiService: AIService;
export {};
//# sourceMappingURL=aiService.d.ts.map