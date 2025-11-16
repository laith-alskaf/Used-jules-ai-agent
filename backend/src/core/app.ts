import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { errorMiddleware } from '@/shared/middleware/error.middleware';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SaaS Accounting & Inventory Management API',
      version: '1.0.0',
      description: 'API documentation for the SaaS Accounting & Inventory Management System',
    },
  },
  apis: ['./src/modules/**/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import authRoutes from '@/modules/auth/auth.routes';

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the SaaS Accounting & Inventory Management API');
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});
import tenantRoutes from '@/modules/tenants/tenant.routes';
import productRoutes from '@/modules/products/product.routes';
import customerRoutes from '@/modules/customers/customer.routes';
import invoiceRoutes from '@/modules/invoices/invoice.routes';
import reportRoutes from '@/modules/reports/reports.routes';

app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/reports', reportRoutes);


// Error Handling
app.use(errorMiddleware);

export default app;
