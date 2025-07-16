import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import routes from './routes';

// Učitavanje environment varijabli
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet()); // Sigurnosni headers
app.use(compression()); // Kompresija odgovora
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Parsiranje JSON-a
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mount API routes
app.use('/', routes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Greška na serveru',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint nije pronađen'
  });
});

// Pokretanje servera
const startServer = async () => {
  try {
    // Povezivanje sa bazom podataka
    await connectDatabase();
    
    // Pokretanje servera
    app.listen(PORT, () => {
      console.log(`🚀 AcAIA Backend server pokrenut na portu ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API docs: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Greška pri pokretanju servera:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM primljen, gasim server...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT primljen, gasim server...');
  process.exit(0);
});

// Pokretanje aplikacije
startServer(); 