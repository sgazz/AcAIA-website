import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
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

// Validacioni šemati
export const authSchemas = {
  register: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Molimo unesite validnu email adresu',
      'any.required': 'Email je obavezan'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Lozinka mora imati najmanje 6 karaktera',
      'any.required': 'Lozinka je obavezna'
    }),
    firstName: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Ime mora imati najmanje 2 karaktera',
      'string.max': 'Ime ne može biti duže od 50 karaktera',
      'any.required': 'Ime je obavezno'
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Prezime mora imati najmanje 2 karaktera',
      'string.max': 'Prezime ne može biti duže od 50 karaktera',
      'any.required': 'Prezime je obavezno'
    }),
    role: Joi.string().valid('student', 'teacher', 'admin').default('student')
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Molimo unesite validnu email adresu',
      'any.required': 'Email je obavezan'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Lozinka je obavezna'
    })
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50),
    preferences: Joi.object({
      language: Joi.string().valid('sr', 'en'),
      theme: Joi.string().valid('light', 'dark'),
      notifications: Joi.boolean()
    })
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      'any.required': 'Trenutna lozinka je obavezna'
    }),
    newPassword: Joi.string().min(6).required().messages({
      'string.min': 'Nova lozinka mora imati najmanje 6 karaktera',
      'any.required': 'Nova lozinka je obavezna'
    })
  })
};

export const chatSchemas = {
  createChat: Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      'string.min': 'Naslov mora imati najmanje 3 karaktera',
      'string.max': 'Naslov ne može biti duži od 100 karaktera',
      'any.required': 'Naslov je obavezan'
    }),
    subject: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Predmet mora imati najmanje 2 karaktera',
      'string.max': 'Predmet ne može biti duži od 50 karaktera',
      'any.required': 'Predmet je obavezan'
    }),
    difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').default('beginner')
  }),

  sendMessage: Joi.object({
    content: Joi.string().min(1).max(2000).required().messages({
      'string.min': 'Poruka ne može biti prazna',
      'string.max': 'Poruka ne može biti duža od 2000 karaktera',
      'any.required': 'Sadržaj poruke je obavezan'
    })
  })
};

export const problemSchemas = {
  generateProblem: Joi.object({
    subject: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Predmet mora imati najmanje 2 karaktera',
      'string.max': 'Predmet ne može biti duži od 50 karaktera',
      'any.required': 'Predmet je obavezan'
    }),
    difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').default('beginner'),
    type: Joi.string().valid('multiple-choice', 'open-ended', 'coding', 'essay').default('multiple-choice'),
    learningObjectives: Joi.array().items(Joi.string()).default([])
  }),

  solveProblem: Joi.object({
    answer: Joi.string().min(1).required().messages({
      'string.min': 'Odgovor ne može biti prazan',
      'any.required': 'Odgovor je obavezan'
    })
  }),

  rateProblem: Joi.object({
    rating: Joi.number().min(1).max(5).required().messages({
      'number.min': 'Ocena mora biti između 1 i 5',
      'number.max': 'Ocena mora biti između 1 i 5',
      'any.required': 'Ocena je obavezna'
    })
  })
}; 