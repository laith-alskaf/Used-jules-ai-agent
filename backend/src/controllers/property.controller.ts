import { Request, Response } from 'express';
import { PropertyService } from '../services/property.service';

export class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const property = await this.propertyService.createProperty(req.body);
      res.status(201).json(property);
    } catch (error) {
      res.status(500).json({ message: 'Error creating property', error });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const result = await this.propertyService.getAllProperties(page, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error getting properties', error });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const property = await this.propertyService.getPropertyById(id);
      if (property) {
        res.status(200).json(property);
      } else {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error getting property', error });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const property = await this.propertyService.updateProperty(id, req.body);
      if (property) {
        res.status(200).json(property);
      } else {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating property', error });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const property = await this.propertyService.deleteProperty(id);
      if (property) {
        res.status(200).json({ message: 'Property deleted successfully' });
      } else {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting property', error });
    }
  };
}
