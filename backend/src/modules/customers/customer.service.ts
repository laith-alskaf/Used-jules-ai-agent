import { z } from 'zod';
import { CustomerRepository } from './customer.repository';
import { createCustomerSchema, updateCustomerSchema } from './customer.schema';

export class CustomerService {
  private customerRepository = new CustomerRepository();

  async createCustomer(tenantId: string, data: z.infer<typeof createCustomerSchema>) {
    return this.customerRepository.createCustomer(tenantId, data);
  }

  async getCustomers(tenantId: string) {
    return this.customerRepository.getCustomers(tenantId);
  }

  async getCustomerById(tenantId: string, id: string) {
    return this.customerRepository.getCustomerById(tenantId, id);
  }

  async updateCustomer(tenantId: string, id: string, data: z.infer<typeof updateCustomerSchema>) {
    return this.customerRepository.updateCustomer(tenantId, id, data);
  }

  async deleteCustomer(tenantId: string, id: string) {
    return this.customerRepository.deleteCustomer(tenantId, id);
  }
}
