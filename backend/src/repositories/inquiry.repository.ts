import { PrismaClient, Inquiry, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class InquiryRepository {
  async create(data: Prisma.InquiryCreateInput): Promise<Inquiry> {
    return prisma.inquiry.create({ data });
  }

  async findAll(): Promise<Inquiry[]> {
    return prisma.inquiry.findMany({
      include: {
        customer: true,
        vehicle: true,
        property: true,
      },
    });
  }

  async findById(id: number): Promise<Inquiry | null> {
    return prisma.inquiry.findUnique({
      where: { id },
      include: {
        customer: true,
        vehicle: true,
        property: true,
      },
    });
  }

  async update(id: number, data: Prisma.InquiryUpdateInput): Promise<Inquiry | null> {
    return prisma.inquiry.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Inquiry | null> {
    return prisma.inquiry.delete({ where: { id } });
  }
}
