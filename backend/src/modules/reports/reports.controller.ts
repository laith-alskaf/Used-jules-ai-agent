import { Request, Response } from 'express';
import { ReportService } from './reports.service';

export class ReportController {
  private reportService = new ReportService();

  async getSalesReport(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const report = await this.reportService.getSalesReport(tenantId);
      res.json({ success: true, data: report, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }
}
