import { PrismaClient, Appointment, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class AppointmentRepository {
  async create(data: Prisma.AppointmentCreateInput): Promise<Appointment> {
    return prisma.appointment.create({ data });
  }

  async findAll(skip: number, take: number): Promise<Appointment[]> {
    return prisma.appointment.findMany({
      skip,
      take,
      include: {
        inquiry: true,
      },
    });
  }

  async countAll(): Promise<number> {
    return prisma.appointment.count();
  }

  async findById(id: number): Promise<Appointment | null> {
    return prisma.appointment.findUnique({
      where: { id },
      include: {
        inquiry: true,
      },
    });
  }

  async update(id: number, data: Prisma.AppointmentUpdateInput): Promise<Appointment | null> {
    return prisma.appointment.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Appointment | null> {
    return prisma.appointment.delete({ where: { id } });
  }
}
