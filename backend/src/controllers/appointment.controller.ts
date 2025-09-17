import { Request, Response } from 'express';
import { AppointmentService } from '../services/appointment.service';

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor() {
    this.appointmentService = new AppointmentService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const appointment = await this.appointmentService.createAppointment(req.body);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating appointment', error });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const appointments = await this.appointmentService.getAllAppointments();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Error getting appointments', error });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const appointment = await this.appointmentService.getAppointmentById(id);
      if (appointment) {
        res.status(200).json(appointment);
      } else {
        res.status(404).json({ message: 'Appointment not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error getting appointment', error });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const appointment = await this.appointmentService.updateAppointment(id, req.body);
      if (appointment) {
        res.status(200).json(appointment);
      } else {
        res.status(404).json({ message: 'Appointment not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating appointment', error });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const appointment = await this.appointmentService.deleteAppointment(id);
      if (appointment) {
        res.status(200).json({ message: 'Appointment deleted successfully' });
      } else {
        res.status(404).json({ message: 'Appointment not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting appointment', error });
    }
  };
}
