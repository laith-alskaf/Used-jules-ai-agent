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

  async getAllCustomers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = limit;

    const customers = await this.customerRepository.findAll(skip, take);
    const totalCustomers = await this.customerRepository.countAll();

    return {
      data: customers,
      total: totalCustomers,
      page,
      limit,
      totalPages: Math.ceil(totalCustomers / limit),
    };
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
