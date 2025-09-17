import { CustomerRepository } from '../repositories/customer.repository';
import { Customer, Prisma } from '@prisma/client';

export class CustomerService {
  private customerRepository: CustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.customerRepository.create(data);
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async getCustomerById(id: number): Promise<Customer | null> {
    return this.customerRepository.findById(id);
  }

  async updateCustomer(id: number, data: Prisma.CustomerUpdateInput): Promise<Customer | null> {
    return this.customerRepository.update(id, data);
  }

  async deleteCustomer(id: number): Promise<Customer | null> {
    return this.customerRepository.delete(id);
  }
}
