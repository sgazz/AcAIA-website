"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemSchemas = exports.chatSchemas = exports.authSchemas = exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            res.status(400).json({
                success: false,
                message: 'Greška u validaciji podataka',
                errors: errorMessage
            });
            return;
        }
        next();
    };
};
exports.validate = validate;
exports.authSchemas = {
    register: joi_1.default.object({
        email: joi_1.default.string().email().required().messages({
            'string.email': 'Molimo unesite validnu email adresu',
            'any.required': 'Email je obavezan'
        }),
        password: joi_1.default.string().min(6).required().messages({
            'string.min': 'Lozinka mora imati najmanje 6 karaktera',
            'any.required': 'Lozinka je obavezna'
        }),
        firstName: joi_1.default.string().min(2).max(50).required().messages({
            'string.min': 'Ime mora imati najmanje 2 karaktera',
            'string.max': 'Ime ne može biti duže od 50 karaktera',
            'any.required': 'Ime je obavezno'
        }),
        lastName: joi_1.default.string().min(2).max(50).required().messages({
            'string.min': 'Prezime mora imati najmanje 2 karaktera',
            'string.max': 'Prezime ne može biti duže od 50 karaktera',
            'any.required': 'Prezime je obavezno'
        }),
        role: joi_1.default.string().valid('student', 'teacher', 'admin').default('student')
    }),
    login: joi_1.default.object({
        email: joi_1.default.string().email().required().messages({
            'string.email': 'Molimo unesite validnu email adresu',
            'any.required': 'Email je obavezan'
        }),
        password: joi_1.default.string().required().messages({
            'any.required': 'Lozinka je obavezna'
        })
    }),
    updateProfile: joi_1.default.object({
        firstName: joi_1.default.string().min(2).max(50),
        lastName: joi_1.default.string().min(2).max(50),
        preferences: joi_1.default.object({
            language: joi_1.default.string().valid('sr', 'en'),
            theme: joi_1.default.string().valid('light', 'dark'),
            notifications: joi_1.default.boolean()
        })
    }),
    changePassword: joi_1.default.object({
        currentPassword: joi_1.default.string().required().messages({
            'any.required': 'Trenutna lozinka je obavezna'
        }),
        newPassword: joi_1.default.string().min(6).required().messages({
            'string.min': 'Nova lozinka mora imati najmanje 6 karaktera',
            'any.required': 'Nova lozinka je obavezna'
        })
    })
};
exports.chatSchemas = {
    createChat: joi_1.default.object({
        title: joi_1.default.string().min(3).max(100).required().messages({
            'string.min': 'Naslov mora imati najmanje 3 karaktera',
            'string.max': 'Naslov ne može biti duži od 100 karaktera',
            'any.required': 'Naslov je obavezan'
        }),
        subject: joi_1.default.string().min(2).max(50).required().messages({
            'string.min': 'Predmet mora imati najmanje 2 karaktera',
            'string.max': 'Predmet ne može biti duži od 50 karaktera',
            'any.required': 'Predmet je obavezan'
        }),
        difficulty: joi_1.default.string().valid('beginner', 'intermediate', 'advanced').default('beginner')
    }),
    sendMessage: joi_1.default.object({
        content: joi_1.default.string().min(1).max(2000).required().messages({
            'string.min': 'Poruka ne može biti prazna',
            'string.max': 'Poruka ne može biti duža od 2000 karaktera',
            'any.required': 'Sadržaj poruke je obavezan'
        })
    })
};
exports.problemSchemas = {
    generateProblem: joi_1.default.object({
        subject: joi_1.default.string().min(2).max(50).required().messages({
            'string.min': 'Predmet mora imati najmanje 2 karaktera',
            'string.max': 'Predmet ne može biti duži od 50 karaktera',
            'any.required': 'Predmet je obavezan'
        }),
        difficulty: joi_1.default.string().valid('beginner', 'intermediate', 'advanced').default('beginner'),
        type: joi_1.default.string().valid('multiple-choice', 'open-ended', 'coding', 'essay').default('multiple-choice'),
        learningObjectives: joi_1.default.array().items(joi_1.default.string()).default([])
    }),
    solveProblem: joi_1.default.object({
        answer: joi_1.default.string().min(1).required().messages({
            'string.min': 'Odgovor ne može biti prazan',
            'any.required': 'Odgovor je obavezan'
        })
    }),
    rateProblem: joi_1.default.object({
        rating: joi_1.default.number().min(1).max(5).required().messages({
            'number.min': 'Ocena mora biti između 1 i 5',
            'number.max': 'Ocena mora biti između 1 i 5',
            'any.required': 'Ocena je obavezna'
        })
    })
};
//# sourceMappingURL=validation.js.map