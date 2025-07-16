import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const generateCareerAdvice: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getCareerPaths: (req: AuthRequest, res: Response) => Promise<void>;
export declare const assessSkills: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getLearningPath: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=careerController.d.ts.map