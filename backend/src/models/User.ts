import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher' | 'admin';
  isActive: boolean;
  profilePicture?: string;
  preferences: {
    language: string;
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  learningProgress: {
    subjects: Array<{
      name: string;
      level: 'beginner' | 'intermediate' | 'advanced';
      progress: number;
      lastActivity: Date;
    }>;
    totalStudyTime: number;
    completedLessons: number;
  };
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Molimo unesite validnu email adresu']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Lozinka mora imati najmanje 6 karaktera']
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Ime ne može biti duže od 50 karaktera']
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Prezime ne može biti duže od 50 karaktera']
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profilePicture: {
    type: String,
    default: null
  },
  preferences: {
    language: {
      type: String,
      default: 'sr'
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    notifications: {
      type: Boolean,
      default: true
    }
  },
  learningProgress: {
    subjects: [{
      name: {
        type: String,
        required: true
      },
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
      },
      progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      lastActivity: {
        type: Date,
        default: Date.now
      }
    }],
    totalStudyTime: {
      type: Number,
      default: 0
    },
    completedLessons: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Hash password pre čuvanja
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Metoda za poređenje lozinki
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Virtual za full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Konfiguracija za JSON serializaciju
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret: any) {
    delete ret.password;
    return ret;
  }
});

export const User = mongoose.model<IUser>('User', userSchema); 