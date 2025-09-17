import { Router } from 'express';
import { InquiryController } from '../controllers/inquiry.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const inquiryController = new InquiryController();

/**
 * @swagger
 * tags:
 *   name: Inquiries
 *   description: Inquiry management endpoints
 */

// Protect all inquiry routes with the authentication middleware
router.use(authMiddleware);

/**
 * @swagger
 * /api/inquiries:
 *   post:
 *     summary: Create a new inquiry
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *               vehicleId:
 *                 type: integer
 *               propertyId:
 *                 type: integer
 *               status:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inquiry created successfully
 *       500:
 *         description: Error creating inquiry
 */
router.post('/', inquiryController.create);

/**
 * @swagger
 * /api/inquiries:
 *   get:
 *     summary: Get all inquiries
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of inquiries
 *       500:
 *         description: Error getting inquiries
 */
router.get('/', inquiryController.getAll);

/**
 * @swagger
 * /api/inquiries/{id}:
 *   get:
 *     summary: Get an inquiry by ID
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single inquiry
 *       404:
 *         description: Inquiry not found
 *       500:
 *         description: Error getting inquiry
 */
router.get('/:id', inquiryController.getById);

/**
 * @swagger
 * /api/inquiries/{id}:
 *   put:
 *     summary: Update an inquiry by ID
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inquiry updated successfully
 *       404:
 *         description: Inquiry not found
 *       500:
 *         description: Error updating inquiry
 */
router.put('/:id', inquiryController.update);

/**
 * @swagger
 * /api/inquiries/{id}:
 *   delete:
 *     summary: Delete an inquiry by ID
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inquiry deleted successfully
 *       404:
 *         description: Inquiry not found
 *       500:
 *         description: Error deleting inquiry
 */
router.delete('/:id', inquiryController.delete);

export default router;
