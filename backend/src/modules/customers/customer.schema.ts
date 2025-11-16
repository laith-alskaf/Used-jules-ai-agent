import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email(),
  address: z.string().optional(),
});

export const updateCustomerSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
});
