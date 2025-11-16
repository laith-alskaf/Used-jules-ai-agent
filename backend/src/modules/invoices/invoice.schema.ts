import { z } from 'zod';

export const createInvoiceSchema = z.object({
  number: z.string(),
  type: z.string(),
  customerId: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      qty: z.number(),
      unitPrice: z.number(),
    })
  ),
});
