import { PrismaClient, Property } from '@prisma/client';

const prisma = new PrismaClient();

export class PropertyRepository {
  async create(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    return prisma.property.create({ data });
  }

  async findAll(): Promise<Property[]> {
    return prisma.property.findMany();
  }

  async findById(id: number): Promise<Property | null> {
    return prisma.property.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<Property>): Promise<Property | null> {
    return prisma.property.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Property | null> {
    return prisma.property.delete({ where: { id } });
  }
}
