import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const propertyController = new PropertyController();

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management endpoints
 */

// Protect all property routes with the authentication middleware
router.use(authMiddleware);

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               location:
 *                 type: string
 *               size:
 *                 type: number
 *               price:
 *                 type: number
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Property created successfully
 *       500:
 *         description: Error creating property
 */
router.post('/', propertyController.create);

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of properties
 *       500:
 *         description: Error getting properties
 */
router.get('/', propertyController.getAll);

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Get a property by ID
 *     tags: [Properties]
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
 *         description: A single property
 *       404:
 *         description: Property not found
 *       500:
 *         description: Error getting property
 */
router.get('/:id', propertyController.getById);

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Update a property by ID
 *     tags: [Properties]
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
 *               type:
 *                 type: string
 *               location:
 *                 type: string
 *               size:
 *                 type: number
 *               price:
 *                 type: number
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Property updated successfully
 *       404:
 *         description: Property not found
 *       500:
 *         description: Error updating property
 */
router.put('/:id', propertyController.update);

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete a property by ID
 *     tags: [Properties]
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
 *         description: Property deleted successfully
 *       404:
 *         description: Property not found
 *       500:
 *         description: Error deleting property
 */
router.delete('/:id', propertyController.delete);

export default router;
