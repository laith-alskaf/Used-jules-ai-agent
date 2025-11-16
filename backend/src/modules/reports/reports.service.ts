import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ReportService {
  async getSalesReport(tenantId: string) {
    const sales = await prisma.invoice.aggregate({
      _sum: {
        total: true,
      },
      where: {
        tenantId,
      },
    });

    return {
      totalSales: sales._sum.total || 0,
    };
  }
}
