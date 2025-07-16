import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const createChat: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getChats: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getChat: (req: AuthRequest, res: Response) => Promise<void>;
export declare const sendMessage: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteChat: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateChat: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=chatController.d.ts.map