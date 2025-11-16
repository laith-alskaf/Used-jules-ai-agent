import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { createTenantSchema } from './tenant.schema';

const prisma = new PrismaClient();

export class TenantRepository {
  async createTenant(data: z.infer<typeof createTenantSchema>) {
    return prisma.tenant.create({
      data,
    });
  }
}
