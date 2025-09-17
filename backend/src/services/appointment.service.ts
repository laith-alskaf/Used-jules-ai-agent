import { AppointmentRepository } from '../repositories/appointment.repository';
import { Appointment, Prisma } from '@prisma/client';

export class AppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = new AppointmentRepository();
  }

  async createAppointment(data: Prisma.AppointmentCreateInput): Promise<Appointment> {
    return this.appointmentRepository.create(data);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentRepository.findAll();
  }

  async getAppointmentById(id: number): Promise<Appointment | null> {
    return this.appointmentRepository.findById(id);
  }

  async updateAppointment(id: number, data: Prisma.AppointmentUpdateInput): Promise<Appointment | null> {
    return this.appointmentRepository.update(id, data);
  }

  async deleteAppointment(id: number): Promise<Appointment | null> {
    return this.appointmentRepository.delete(id);
  }
}
