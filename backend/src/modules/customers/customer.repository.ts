import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { createCustomerSchema, updateCustomerSchema } from './customer.schema';

const prisma = new PrismaClient();

export class CustomerRepository {
  async createCustomer(tenantId: string, data: z.infer<typeof createCustomerSchema>) {
    return prisma.customer.create({
      data: {
        ...data,
        tenantId,
      },
    });
  }

  async getCustomers(tenantId: string) {
    return prisma.customer.findMany({
      where: {
        tenantId,
      },
    });
  }

  async getCustomerById(tenantId: string, id: string) {
    return prisma.customer.findFirst({
      where: {
        id,
        tenantId,
      },
    });
  }

  async updateCustomer(tenantId: string, id: string, data: z.infer<typeof updateCustomerSchema>) {
    return prisma.customer.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteCustomer(tenantId: string, id: string) {
    return prisma.customer.delete({
      where: {
        id,
      },
    });
  }
}
