import { PrismaClient, Vehicle } from '@prisma/client';

const prisma = new PrismaClient();

export class VehicleRepository {
  async create(data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> {
    return prisma.vehicle.create({ data });
  }

  async findAll(): Promise<Vehicle[]> {
    return prisma.vehicle.findMany();
  }

  async findById(id: number): Promise<Vehicle | null> {
    return prisma.vehicle.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<Vehicle>): Promise<Vehicle | null> {
    return prisma.vehicle.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Vehicle | null> {
    return prisma.vehicle.delete({ where: { id } });
  }
}
