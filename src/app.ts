import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';
import bodyParser from 'body-parser';
import cors from 'cors';
import mailRoutes from './routes/mail.routes';
import { authenticate } from './middleware/authenticate.middleware';

const app = express();

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Parse application/x-www-form-urlencoded and application/json requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Security middleware
app.use(helmet());
app.disable('x-powered-by'); // Disable the 'X-Powered-By' header for security (normally includes framework being used)

// Register routes (anything exported from /*/routes/*.router.ts)
app.use('/api/v1', authenticate, mailRoutes);

// Handle 404 - Not Found
app.use(notFoundHandler);

// Global error handler (must be last - catches errors from routes)
app.use(errorHandler);

export default app;
