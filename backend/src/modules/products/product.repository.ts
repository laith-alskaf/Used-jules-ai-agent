import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { createProductSchema, updateProductSchema } from './product.schema';

const prisma = new PrismaClient();

export class ProductRepository {
  async createProduct(tenantId: string, data: z.infer<typeof createProductSchema>) {
    return prisma.product.create({
      data: {
        ...data,
        tenantId,
      },
    });
  }

  async getProducts(tenantId: string) {
    return prisma.product.findMany({
      where: {
        tenantId,
      },
    });
  }

  async getProductById(tenantId: string, id: string) {
    return prisma.product.findFirst({
      where: {
        id,
        tenantId,
      },
    });
  }

  async updateProduct(tenantId: string, id: string, data: z.infer<typeof updateProductSchema>) {
    return prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteProduct(tenantId: string, id: string) {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
