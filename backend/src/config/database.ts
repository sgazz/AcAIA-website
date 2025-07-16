import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.NODE_ENV === 'production' 
  ? process.env.MONGODB_URI_PROD 
  : process.env.MONGODB_URI || 'mongodb://localhost:27017/acaia_db';

export const connectDatabase = async (): Promise<void> => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI nije definisan u environment varijablama');
    }
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB povezan uspešno');
  } catch (error) {
    console.error('❌ Greška pri povezivanju sa MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB odvezan uspešno');
  } catch (error) {
    console.error('❌ Greška pri odvezivanju sa MongoDB:', error);
  }
};

// Event listeners za MongoDB konekciju
mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB konekcija greška:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB konekcija prekinuta');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await disconnectDatabase();
  process.exit(0);
}); 