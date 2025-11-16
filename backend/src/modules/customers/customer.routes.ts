import { Router } from 'express';
import { CustomerController } from './customer.controller';
import { authMiddleware } from '@/shared/middleware/auth.middleware';

const router = Router();
const customerController = new CustomerController();

router.get('/', authMiddleware, customerController.getCustomers.bind(customerController));
router.post('/', authMiddleware, customerController.createCustomer.bind(customerController));
router.get('/:id', authMiddleware, customerController.getCustomerById.bind(customerController));
router.patch('/:id', authMiddleware, customerController.updateCustomer.bind(customerController));
router.delete('/:id', authMiddleware, customerController.deleteCustomer.bind(customerController));

export default router;
