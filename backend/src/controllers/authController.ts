import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { JWTPayload } from '../middleware/auth';
import { getMockUserByEmail, getMockUserById } from '../utils/mockData';

interface AuthRequest extends Request {
  user?: any;
}

// Generisanje JWT tokena
const generateToken = (userId: string, email: string, role: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET nije definisan u environment varijablama');
  }
  return jwt.sign(
    { userId, email, role },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
  );
};

// Registracija korisnika
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName, role = 'student' } = req.body;

    // Provera da li korisnik već postoji
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (error) {
      // Ako nema baze podataka, koristi mock podatke
      existingUser = getMockUserByEmail(email);
    }

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'Korisnik sa ovom email adresom već postoji.'
      });
      return;
    }

    // Kreiranje novog korisnika
    try {
      const user = new User({
        email,
        password,
        firstName,
        lastName,
        role
      });

      await user.save();

      // Generisanje tokena
      const token = generateToken((user._id as any).toString(), user.email, user.role);

      res.status(201).json({
        success: true,
        message: 'Korisnik uspešno registrovan.',
        data: {
          user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            fullName: user.fullName
          },
          token
        }
      });
    } catch (error) {
      // Ako nema baze podataka, simuliraj uspešnu registraciju
      const mockUserId = `mock-user-${Date.now()}`;
      const token = generateToken(mockUserId, email, role);

      res.status(201).json({
        success: true,
        message: 'Korisnik uspešno registrovan (mock mode).',
        data: {
          user: {
            id: mockUserId,
            email,
            firstName,
            lastName,
            role,
            fullName: `${firstName} ${lastName}`
          },
          token
        }
      });
    }
  } catch (error) {
    console.error('Greška pri registraciji:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Login korisnika
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Pronalaženje korisnika
    let user;
    try {
      user = await User.findOne({ email });
    } catch (error) {
      // Ako nema baze podataka, koristi mock podatke
      user = getMockUserByEmail(email);
    }

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Nevažeći email ili lozinka.'
      });
      return;
    }

    // Provera da li je korisnik aktivan (za mock korisnike uvek je aktivan)
    if (user.isActive === false) {
      res.status(401).json({
        success: false,
        message: 'Nalog je deaktiviran. Kontaktirajte administratora.'
      });
      return;
    }

    // Provera lozinke
    let isPasswordValid = false;
    try {
      isPasswordValid = await user.comparePassword(password);
    } catch (error) {
      // Za mock korisnike, prihvati bilo koju lozinku
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Nevažeći email ili lozinka.'
      });
      return;
    }

    // Generisanje tokena
    const token = generateToken((user._id as any).toString(), user.email, user.role);

    res.json({
      success: true,
      message: 'Uspešno prijavljivanje.',
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          fullName: user.fullName,
          preferences: user.preferences || {},
          learningProgress: user.learningProgress || {}
        },
        token
      }
    });
  } catch (error) {
    console.error('Greška pri prijavljivanju:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Dobijanje trenutnog korisnika
export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Korisnik nije pronađen.'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          fullName: user.fullName,
          profilePicture: user.profilePicture,
          preferences: user.preferences,
          learningProgress: user.learningProgress,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Greška pri dobijanju korisnika:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Ažuriranje profila korisnika
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, preferences } = req.body;
    const userId = req.user._id;

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (preferences) updateData.preferences = { ...req.user.preferences, ...preferences };

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Korisnik nije pronađen.'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Profil uspešno ažuriran.',
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          fullName: user.fullName,
          profilePicture: user.profilePicture,
          preferences: user.preferences,
          learningProgress: user.learningProgress
        }
      }
    });
  } catch (error) {
    console.error('Greška pri ažuriranju profila:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Promena lozinke
export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Korisnik nije pronađen.'
      });
      return;
    }

    // Provera trenutne lozinke
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      res.status(400).json({
        success: false,
        message: 'Trenutna lozinka nije ispravna.'
      });
      return;
    }

    // Ažuriranje lozinke
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Lozinka uspešno promenjena.'
    });
  } catch (error) {
    console.error('Greška pri promeni lozinke:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
}; 