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

  async getAllAppointments(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = limit;

    const appointments = await this.appointmentRepository.findAll(skip, take);
    const totalAppointments = await this.appointmentRepository.countAll();

    return {
      data: appointments,
      total: totalAppointments,
      page,
      limit,
      totalPages: Math.ceil(totalAppointments / limit),
    };
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
