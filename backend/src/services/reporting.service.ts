import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ReportingService {
  /**
   * Generates a basic sales report.
   * A "sale" is defined as an inquiry with the status 'converted'.
   * This report calculates total revenue and the number of vehicles/properties sold.
   */
  async getSalesReports() {
    const convertedInquiries = await prisma.inquiry.findMany({
      where: { status: 'converted' },
      include: {
        vehicle: true,
        property: true,
      },
    });

    let totalRevenue = 0;
    let vehiclesSold = 0;
    let propertiesSold = 0;

    convertedInquiries.forEach(inquiry => {
      if (inquiry.vehicle) {
        totalRevenue += inquiry.vehicle.price;
        vehiclesSold++;
      }
      if (inquiry.property) {
        totalRevenue += inquiry.property.price;
        propertiesSold++;
      }
    });

    return {
      totalRevenue,
      totalUnitsSold: vehiclesSold + propertiesSold,
      vehiclesSold,
      propertiesSold,
    };
  }

  /**
   * Generates a report on inquiry conversion metrics.
   * This report counts the number of inquiries in each status category.
   */
  async getInquiryConversionMetrics() {
    const inquiryStatusCounts = await prisma.inquiry.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    // The result is an array of objects like { status: 'new', _count: { status: 10 } }.
    // We can format this into a more friendly object.
    const formattedCounts = inquiryStatusCounts.reduce((acc, current) => {
      acc[current.status] = current._count.status;
      return acc;
    }, {} as Record<string, number>);

    return formattedCounts;
  }

  /**
   * Generates a report on inventory performance, ranked by the number of inquiries.
   */
  async getInventoryPerformance() {
    const vehiclePerformance = await prisma.vehicle.findMany({
      include: {
        _count: {
          select: { inquiries: true },
        },
      },
      orderBy: {
        inquiries: {
          _count: 'desc',
        },
      },
    });

    const propertyPerformance = await prisma.property.findMany({
      include: {
        _count: {
          select: { inquiries: true },
        },
      },
      orderBy: {
        inquiries: {
          _count: 'desc',
        },
      },
    });

    return {
      vehiclePerformance,
      propertyPerformance,
    };
  }
}
