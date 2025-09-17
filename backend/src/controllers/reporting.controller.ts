import { Request, Response } from 'express';
import { ReportingService } from '../services/reporting.service';

export class ReportingController {
  private reportingService: ReportingService;

  constructor() {
    this.reportingService = new ReportingService();
  }

  getSalesReports = async (req: Request, res: Response): Promise<void> => {
    try {
      const report = await this.reportingService.getSalesReports();
      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ message: 'Error generating sales report', error });
    }
  };

  getInquiryConversionMetrics = async (req: Request, res: Response): Promise<void> => {
    try {
      const metrics = await this.reportingService.getInquiryConversionMetrics();
      res.status(200).json(metrics);
    } catch (error) {
      res.status(500).json({ message: 'Error generating inquiry conversion metrics', error });
    }
  };

  getInventoryPerformance = async (req: Request, res: Response): Promise<void> => {
    try {
      const performance = await this.reportingService.getInventoryPerformance();
      res.status(200).json(performance);
    } catch (error) {
      res.status(500).json({ message: 'Error generating inventory performance report', error });
    }
  };
}
