import { Request, Response } from 'express';
import { InvoiceService } from './invoice.service';
import { createInvoiceSchema } from './invoice.schema';

export class InvoiceController {
  private invoiceService = new InvoiceService();

  async createInvoice(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const idempotencyKey = req.headers['idempotency-key'] as string;

      // In a real application, you would use a caching mechanism like Redis
      // to store the idempotency key and prevent duplicate requests.
      if (idempotencyKey) {
        console.log(`Idempotency key: ${idempotencyKey}`);
      }

      const validatedData = createInvoiceSchema.parse(req.body);
      const invoice = await this.invoiceService.createInvoice(tenantId, validatedData);
      res.status(201).json({ success: true, data: invoice, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }

  async getInvoices(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const invoices = await this.invoiceService.getInvoices(tenantId);
      res.json({ success: true, data: invoices, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }
}
