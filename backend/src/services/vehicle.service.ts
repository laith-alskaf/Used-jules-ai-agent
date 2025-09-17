import { VehicleRepository } from '../repositories/vehicle.repository';
import { Vehicle } from '@prisma/client';

export class VehicleService {
  private vehicleRepository: VehicleRepository;

  constructor() {
    this.vehicleRepository = new VehicleRepository();
  }

  async createVehicle(data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> {
    return this.vehicleRepository.create(data);
  }

  async getAllVehicles(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = limit;

    const vehicles = await this.vehicleRepository.findAll(skip, take);
    const totalVehicles = await this.vehicleRepository.countAll();

    return {
      data: vehicles,
      total: totalVehicles,
      page,
      limit,
      totalPages: Math.ceil(totalVehicles / limit),
    };
  }

  async getVehicleById(id: number): Promise<Vehicle | null> {
    return this.vehicleRepository.findById(id);
  }

  async updateVehicle(id: number, data: Partial<Vehicle>): Promise<Vehicle | null> {
    return this.vehicleRepository.update(id, data);
  }

  async deleteVehicle(id: number): Promise<Vehicle | null> {
    return this.vehicleRepository.delete(id);
  }
}
