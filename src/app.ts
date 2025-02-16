import express from 'express';
import bodyParser from 'body-parser';
import { topicRoutes } from './routes/topicRoutes';
import { resourceRoutes } from './routes/resourceRoutes';
import { userRoutes } from './routes/userRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();
app.use(bodyParser.json());

// Use routes
app.use('/topics', topicRoutes);
app.use('/resources', resourceRoutes);
app.use('/users', userRoutes);

// Global error handler
app.use(errorMiddleware);

export default app;
