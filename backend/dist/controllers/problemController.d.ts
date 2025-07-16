import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const generateProblem: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getProblems: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getProblem: (req: AuthRequest, res: Response) => Promise<void>;
export declare const solveProblem: (req: AuthRequest, res: Response) => Promise<void>;
export declare const rateProblem: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createProblem: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=problemController.d.ts.map