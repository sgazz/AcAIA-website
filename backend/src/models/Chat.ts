import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    subject?: string;
    difficulty?: string;
    learningObjective?: string;
  };
}

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  subject: string;
  messages: IMessage[];
  isActive: boolean;
  lastActivity: Date;
  metadata: {
    totalTokens: number;
    learningObjectives: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedDuration: number; // u minutima
  };
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    subject: String,
    difficulty: String,
    learningObjective: String
  }
});

const chatSchema = new Schema<IChat>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Naslov ne može biti duži od 100 karaktera']
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  messages: [messageSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  metadata: {
    totalTokens: {
      type: Number,
      default: 0
    },
    learningObjectives: [{
      type: String,
      trim: true
    }],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    estimatedDuration: {
      type: Number,
      default: 30
    }
  }
}, {
  timestamps: true
});

// Index za brže pretraživanje
chatSchema.index({ userId: 1, lastActivity: -1 });
chatSchema.index({ subject: 1, difficulty: 1 });

// Virtual za broj poruka
chatSchema.virtual('messageCount').get(function() {
  return this.messages.length;
});

// Metoda za dodavanje poruke
chatSchema.methods.addMessage = function(message: IMessage) {
  this.messages.push(message);
  this.lastActivity = new Date();
  return this.save();
};

// Metoda za dobijanje poslednjih N poruka
chatSchema.methods.getRecentMessages = function(limit: number = 10) {
  return this.messages.slice(-limit);
};

export const Chat = mongoose.model<IChat>('Chat', chatSchema); 