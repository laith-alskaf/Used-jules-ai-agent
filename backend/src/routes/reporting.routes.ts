import { Router } from 'express';
import { ReportingController } from '../controllers/reporting.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const reportingController = new ReportingController();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Endpoints for generating reports
 */

// Protect all reporting routes with the authentication middleware
router.use(authMiddleware);

/**
 * @swagger
 * /api/reports/sales:
 *   get:
 *     summary: Get a report on sales
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A sales report including total revenue and units sold.
 *       500:
 *         description: Error generating sales report
 */
router.get('/sales', reportingController.getSalesReports);

/**
 * @swagger
 * /api/reports/inquiry-conversion:
 *   get:
 *     summary: Get a report on inquiry conversion metrics
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A report showing the count of inquiries for each status.
 *       500:
 *         description: Error generating inquiry conversion metrics
 */
router.get('/inquiry-conversion', reportingController.getInquiryConversionMetrics);

/**
 * @swagger
 * /api/reports/inventory-performance:
 *   get:
 *     summary: Get a report on inventory performance
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A report showing vehicles and properties ranked by the number of inquiries.
 *       500:
 *         description: Error generating inventory performance report
 */
router.get('/inventory-performance', reportingController.getInventoryPerformance);

export default router;
