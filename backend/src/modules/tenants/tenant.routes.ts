import { Router } from 'express';
import { TenantController } from './tenant.controller';
import { authMiddleware } from '@/shared/middleware/auth.middleware';

const router = Router();
const tenantController = new TenantController();

router.post('/', authMiddleware, tenantController.createTenant.bind(tenantController));

export default router;
