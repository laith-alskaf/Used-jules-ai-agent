import { Router } from 'express';
import { ReportController } from './reports.controller';
import { authMiddleware } from '@/shared/middleware/auth.middleware';

const router = Router();
const reportController = new ReportController();

/**
 * @swagger
 * /api/reports/sales:
 *   get:
 *     summary: Get a sales report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The sales report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalesReport'
 */
router.get('/sales', authMiddleware, reportController.getSalesReport.bind(reportController));

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     SalesReport:
 *       type: object
 *       properties:
 *         totalSales:
 *           type: number
 */
