import { PropertyRepository } from '../repositories/property.repository';
import { Property } from '@prisma/client';

export class PropertyService {
  private propertyRepository: PropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  async createProperty(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    return this.propertyRepository.create(data);
  }

  async getAllProperties(): Promise<Property[]> {
    return this.propertyRepository.findAll();
  }

  async getPropertyById(id: number): Promise<Property | null> {
    return this.propertyRepository.findById(id);
  }

  async updateProperty(id: number, data: Partial<Property>): Promise<Property | null> {
    return this.propertyRepository.update(id, data);
  }

  async deleteProperty(id: number): Promise<Property | null> {
    return this.propertyRepository.delete(id);
  }
}
