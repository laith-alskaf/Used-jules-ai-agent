import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Demo Tenant',
    },
  });

  const hashedPassword = await bcrypt.hash('password', 10);
  const user = await prisma.user.create({
    data: {
      email: 'user@demo.com',
      passwordHash: hashedPassword,
      tenantId: tenant.id,
      name: 'Demo User',
    },
  });

  const product = await prisma.product.create({
    data: {
      tenantId: tenant.id,
      sku: 'DEMO-SKU-1',
      name: 'Demo Product',
      price: 100,
      stockQty: 1000,
      reorderLevel: 100,
    },
  });

  const customer = await prisma.customer.create({
    data: {
      tenantId: tenant.id,
      name: 'Demo Customer',
      email: 'customer@demo.com',
    },
  });

  console.log({ tenant, user, product, customer });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
