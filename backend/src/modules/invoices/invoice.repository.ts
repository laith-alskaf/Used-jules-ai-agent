import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { createInvoiceSchema } from './invoice.schema';

const prisma = new PrismaClient();

export class InvoiceRepository {
  async createInvoice(tenantId: string, data: z.infer<typeof createInvoiceSchema>) {
    return prisma.$transaction(async (tx) => {
      // 1. Validate product availability
      for (const item of data.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });
        if (!product || product.stockQty < item.qty) {
          throw new Error('Product not available in sufficient quantity');
        }
      }

      // 2. Create invoice and invoice items
      const invoice = await tx.invoice.create({
        data: {
          tenantId,
          number: data.number,
          type: data.type,
          customerId: data.customerId,
          total: data.items.reduce((acc, item) => acc + item.qty * item.unitPrice, 0),
          status: 'draft',
          items: {
            create: data.items.map((item) => ({
              productId: item.productId,
              qty: item.qty,
              unitPrice: item.unitPrice,
              lineTotal: item.qty * item.unitPrice,
            })),
          },
        },
      });

      // 3. Adjust product stock
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQty: {
              decrement: item.qty,
            },
          },
        });
      }

      // 4. Create financial transaction
      await tx.transaction.create({
        data: {
          tenantId,
          refType: 'invoice',
          refId: invoice.id,
          amount: invoice.total,
        },
      });

      return invoice;
    });
  }

  async getInvoices(tenantId: string) {
    return prisma.invoice.findMany({
      where: {
        tenantId,
      },
    });
  }
}
