import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
export declare const validate: (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const authSchemas: {
    register: Joi.ObjectSchema<any>;
    login: Joi.ObjectSchema<any>;
    updateProfile: Joi.ObjectSchema<any>;
    changePassword: Joi.ObjectSchema<any>;
};
export declare const chatSchemas: {
    createChat: Joi.ObjectSchema<any>;
    sendMessage: Joi.ObjectSchema<any>;
};
export declare const problemSchemas: {
    generateProblem: Joi.ObjectSchema<any>;
    solveProblem: Joi.ObjectSchema<any>;
    rateProblem: Joi.ObjectSchema<any>;
};
//# sourceMappingURL=validation.d.ts.map