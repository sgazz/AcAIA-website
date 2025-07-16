import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.NODE_ENV === 'production' 
  ? process.env.MONGODB_URI_PROD 
  : process.env.MONGODB_URI || 'mongodb://localhost:27017/acaia_db';

export const connectDatabase = async (): Promise<void> => {
  try {
    if (!MONGODB_URI) {
      console.log('⚠️ MONGODB_URI nije definisan, preskačem konekciju sa bazom');
      return;
    }
    
    // Za development, ne zaustavljaj aplikaciju ako MongoDB nije dostupan
    if (process.env.NODE_ENV === 'development') {
      try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB povezan uspešno');
      } catch (error) {
        console.log('⚠️ MongoDB nije dostupan, aplikacija će raditi bez baze podataka');
        console.log('💡 Za potpunu funkcionalnost, pokrenite MongoDB ili koristite MongoDB Atlas');
      }
    } else {
      // Za production, zaustavi aplikaciju ako nema baze
      await mongoose.connect(MONGODB_URI);
      console.log('✅ MongoDB povezan uspešno');
    }
  } catch (error) {
    console.error('❌ Greška pri povezivanju sa MongoDB:', error);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
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