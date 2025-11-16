import { Router } from 'express';
import { InvoiceController } from './invoice.controller';
import { authMiddleware } from '@/shared/middleware/auth.middleware';

const router = Router();
const invoiceController = new InvoiceController();

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 */
router.get('/', authMiddleware, invoiceController.getInvoices.bind(invoiceController));

/**
 * @swagger
 * /api/invoices:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInvoice'
 *     responses:
 *       201:
 *         description: The invoice was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Bad request
 */
router.post('/', authMiddleware, invoiceController.createInvoice.bind(invoiceController));

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         number:
 *           type: string
 *         type:
 *           type: string
 *         customerId:
 *           type: string
 *         total:
 *           type: number
 *         status:
 *           type: string
 *     CreateInvoice:
 *       type: object
 *       required:
 *         - number
 *         - type
 *         - customerId
 *         - items
 *       properties:
 *         number:
 *           type: string
 *         type:
 *           type: string
 *         customerId:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               qty:
 *                 type: number
 *               unitPrice:
 *                 type: number
 */
