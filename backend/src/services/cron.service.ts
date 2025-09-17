import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { EmailService } from './email.service';
import logger from './logger';

const prisma = new PrismaClient();

export class CronService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  public start() {
    // Schedule a task to run every day at 8:00 AM server time.
    cron.schedule('0 8 * * *', this.sendAppointmentReminders);
    logger.info('Cron job for appointment reminders scheduled.');
  }

  private sendAppointmentReminders = async () => {
    logger.info('Running cron job: Sending appointment reminders...');

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    try {
      const upcomingAppointments = await prisma.appointment.findMany({
        where: {
          date: {
            gte: now,
            lt: tomorrow,
          },
        },
      });

      if (upcomingAppointments.length === 0) {
        logger.info('No upcoming appointments found for tomorrow.');
        return;
      }

      logger.info(`Found ${upcomingAppointments.length} upcoming appointments.`);

      const recipientEmail = process.env.BUSINESS_OWNER_EMAIL;
      if (!recipientEmail) {
        logger.warn('BUSINESS_OWNER_EMAIL not set. Skipping appointment reminders.');
        return;
      }

      for (const appointment of upcomingAppointments) {
        this.emailService.sendAppointmentReminder(appointment, recipientEmail).catch(error => {
          logger.error(`Failed to send reminder for appointment #${appointment.id}:`, error);
        });
      }
    } catch (error) {
      logger.error('Error in sendAppointmentReminders cron job:', error);
    }
  };
}
