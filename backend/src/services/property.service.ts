import { PropertyRepository } from '../repositories/property.repository';
import { Property, Prisma } from '@prisma/client';

export class PropertyService {
  private propertyRepository: PropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  async createProperty(data: Prisma.PropertyCreateInput): Promise<Property> {
    return this.propertyRepository.create(data);
  }

  async getAllProperties(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = limit;

    const properties = await this.propertyRepository.findAll(skip, take);
    const totalProperties = await this.propertyRepository.countAll();

    return {
      data: properties,
      total: totalProperties,
      page,
      limit,
      totalPages: Math.ceil(totalProperties / limit),
    };
  }

  async getPropertyById(id: number): Promise<Property | null> {
    return this.propertyRepository.findById(id);
  }

  async updateProperty(id: number, data: Prisma.PropertyUpdateInput): Promise<Property | null> {
    return this.propertyRepository.update(id, data);
  }

  async deleteProperty(id: number): Promise<Property | null> {
    return this.propertyRepository.delete(id);
  }
}
