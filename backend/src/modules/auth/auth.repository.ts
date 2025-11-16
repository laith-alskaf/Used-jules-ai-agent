import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { registerSchema } from './auth.schema';

const prisma = new PrismaClient();

export class AuthRepository {
  async createUser(data: z.infer<typeof registerSchema>) {
    const tenant = await prisma.tenant.create({
      data: {
        name: data.tenantName,
      },
    });

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.password,
        tenantId: tenant.id,
      },
    });

    return { user, tenant };
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
