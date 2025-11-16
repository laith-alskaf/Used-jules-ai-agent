import { Request, Response } from 'express';
import { CustomerService } from './customer.service';
import { createCustomerSchema, updateCustomerSchema } from './customer.schema';

export class CustomerController {
  private customerService = new CustomerService();

  async createCustomer(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const validatedData = createCustomerSchema.parse(req.body);
      const customer = await this.customerService.createCustomer(tenantId, validatedData);
      res.status(201).json({ success: true, data: customer, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }

  async getCustomers(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const customers = await this.customerService.getCustomers(tenantId);
      res.json({ success: true, data: customers, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }

  async getCustomerById(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const { id } = req.params;
      const customer = await this.customerService.getCustomerById(tenantId, id);
      res.json({ success: true, data: customer, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }

  async updateCustomer(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const { id } = req.params;
      const validatedData = updateCustomerSchema.parse(req.body);
      const customer = await this.customerService.updateCustomer(tenantId, id, validatedData);
      res.json({ success: true, data: customer, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }

  async deleteCustomer(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const { id } = req.params;
      await this.customerService.deleteCustomer(tenantId, id);
      res.json({ success: true, data: null, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }
}
