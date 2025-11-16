import { z } from 'zod';
import { InvoiceRepository } from './invoice.repository';
import { createInvoiceSchema } from './invoice.schema';

export class InvoiceService {
  private invoiceRepository = new InvoiceRepository();

  async createInvoice(tenantId: string, data: z.infer<typeof createInvoiceSchema>) {
    return this.invoiceRepository.createInvoice(tenantId, data);
  }

  async getInvoices(tenantId: string) {
    return this.invoiceRepository.getInvoices(tenantId);
  }
}
