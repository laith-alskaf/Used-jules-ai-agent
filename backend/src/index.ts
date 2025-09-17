import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import i18next from './i18n';
import i18nextMiddleware from 'i18next-http-middleware';
import authRoutes from './routes/auth.routes';
import vehicleRoutes from './routes/vehicle.routes';
import propertyRoutes from './routes/property.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import logger from './logger';
import errorHandler from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

// i18next middleware
app.use(i18nextMiddleware.handle(i18next));

// Setup morgan to use winston for http logging
const stream = {
  write: (message: string) => logger.http(message.trim()),
};
app.use(morgan('combined', { stream }));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/properties', propertyRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Centralized error handler
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
  logger.info(`API documentation available at http://localhost:${port}/api-docs`);
});
