import { PrismaClient, Property, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class PropertyRepository {
  async create(data: Prisma.PropertyCreateInput): Promise<Property> {
    return prisma.property.create({ data });
  }

  async findAll(skip: number, take: number): Promise<Property[]> {
    return prisma.property.findMany({
      skip,
      take,
    });
  }

  async countAll(): Promise<number> {
    return prisma.property.count();
  }

  async findById(id: number): Promise<Property | null> {
    return prisma.property.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.PropertyUpdateInput): Promise<Property | null> {
    return prisma.property.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Property | null> {
    return prisma.property.delete({ where: { id } });
  }
}
