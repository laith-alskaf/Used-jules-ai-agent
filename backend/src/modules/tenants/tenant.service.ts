import { z } from 'zod';
import { TenantRepository } from './tenant.repository';
import { createTenantSchema } from './tenant.schema';

export class TenantService {
  private tenantRepository = new TenantRepository();

  async createTenant(data: z.infer<typeof createTenantSchema>) {
    return this.tenantRepository.createTenant(data);
  }
}
