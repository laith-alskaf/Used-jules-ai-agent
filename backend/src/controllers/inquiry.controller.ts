import { Request, Response } from 'express';
import { InquiryService } from '../services/inquiry.service';

export class InquiryController {
  private inquiryService: InquiryService;

  constructor() {
    this.inquiryService = new InquiryService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const inquiry = await this.inquiryService.createInquiry(req.body);
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(500).json({ message: 'Error creating inquiry', error });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const inquiries = await this.inquiryService.getAllInquiries();
      res.status(200).json(inquiries);
    } catch (error) {
      res.status(500).json({ message: 'Error getting inquiries', error });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const inquiry = await this.inquiryService.getInquiryById(id);
      if (inquiry) {
        res.status(200).json(inquiry);
      } else {
        res.status(404).json({ message: 'Inquiry not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error getting inquiry', error });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const inquiry = await this.inquiryService.updateInquiry(id, req.body);
      if (inquiry) {
        res.status(200).json(inquiry);
      } else {
        res.status(404).json({ message: 'Inquiry not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating inquiry', error });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const inquiry = await this.inquiryService.deleteInquiry(id);
      if (inquiry) {
        res.status(200).json({ message: 'Inquiry deleted successfully' });
      } else {
        res.status(404).json({ message: 'Inquiry not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting inquiry', error });
    }
  };
}
