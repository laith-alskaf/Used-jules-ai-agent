import { Request, Response } from 'express';
import { TenantService } from './tenant.service';
import { createTenantSchema } from './tenant.schema';

export class TenantController {
  private tenantService = new TenantService();

  async createTenant(req: Request, res: Response) {
    try {
      const validatedData = createTenantSchema.parse(req.body);
      const tenant = await this.tenantService.createTenant(validatedData);
      res.status(201).json({ success: true, data: tenant, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }
}
