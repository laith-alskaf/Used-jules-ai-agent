import { z } from 'zod';

export const createProductSchema = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number(),
  stockQty: z.number(),
  reorderLevel: z.number(),
});

export const updateProductSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  stockQty: z.number().optional(),
  reorderLevel: z.number().optional(),
});
