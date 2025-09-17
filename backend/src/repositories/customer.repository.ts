import { PrismaClient, Customer, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class CustomerRepository {
  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return prisma.customer.create({ data });
  }

  async findAll(): Promise<Customer[]> {
    return prisma.customer.findMany();
  }

  async findById(id: number): Promise<Customer | null> {
    return prisma.customer.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.CustomerUpdateInput): Promise<Customer | null> {
    return prisma.customer.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Customer | null> {
    return prisma.customer.delete({ where: { id } });
  }
}
