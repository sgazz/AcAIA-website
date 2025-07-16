import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const generateExam: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getExams: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getExam: (req: AuthRequest, res: Response) => Promise<void>;
export declare const submitExam: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getExamResults: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getExamStats: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=examController.d.ts.map