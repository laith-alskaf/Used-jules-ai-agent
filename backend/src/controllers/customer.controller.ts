import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';

export class CustomerController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const customer = await this.customerService.createCustomer(req.body);
      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ message: 'Error creating customer', error });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const result = await this.customerService.getAllCustomers(page, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error getting customers', error });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const customer = await this.customerService.getCustomerById(id);
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: 'Customer not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error getting customer', error });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const customer = await this.customerService.updateCustomer(id, req.body);
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: 'Customer not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating customer', error });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const customer = await this.customerService.deleteCustomer(id);
      if (customer) {
        res.status(200).json({ message: 'Customer deleted successfully' });
      } else {
        res.status(404).json({ message: 'Customer not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting customer', error });
    }
  };
}
