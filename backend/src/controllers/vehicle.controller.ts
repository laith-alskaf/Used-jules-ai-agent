import { Request, Response } from 'express';
import { VehicleService } from '../services/vehicle.service';

export class VehicleController {
  private vehicleService: VehicleService;

  constructor() {
    this.vehicleService = new VehicleService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const vehicle = await this.vehicleService.createVehicle(req.body);
      res.status(201).json(vehicle);
    } catch (error) {
      res.status(500).json({ message: 'Error creating vehicle', error });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const vehicles = await this.vehicleService.getAllVehicles();
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ message: 'Error getting vehicles', error });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const vehicle = await this.vehicleService.getVehicleById(id);
      if (vehicle) {
        res.status(200).json(vehicle);
      } else {
        res.status(404).json({ message: 'Vehicle not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error getting vehicle', error });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const vehicle = await this.vehicleService.updateVehicle(id, req.body);
      if (vehicle) {
        res.status(200).json(vehicle);
      } else {
        res.status(404).json({ message: 'Vehicle not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating vehicle', error });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const vehicle = await this.vehicleService.deleteVehicle(id);
      if (vehicle) {
        res.status(200).json({ message: 'Vehicle deleted successfully' });
      } else {
        res.status(404).json({ message: 'Vehicle not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting vehicle', error });
    }
  };
}
