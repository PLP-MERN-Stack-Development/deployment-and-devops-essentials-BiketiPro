import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler } from './middleware/errorHandler.js';
import healthRoute from './routes/health.js';
import cors from 'cors';

const router = express.Router();
const app = express();

// Security & performance
app.use(helmet());
app.use(compression());
app.use(cors());

// JSON parser
app.use(express.json());

// Health check
app.use('/health', healthRoute);


router.post('/register', registerUser);
router.post('/login', loginUser);

// Error handler (last)
app.use(errorHandler);

export default router;
