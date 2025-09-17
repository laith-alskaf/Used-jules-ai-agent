import nodemailer from 'nodemailer';
import logger from './logger';
import { Inquiry, Appointment } from '@prisma/client';

export class EmailService {
  private transporter: nodemailer.Transporter;
  private testAccount: nodemailer.TestAccount | null = null;

  constructor() {
    this.transporter = nodemailer.createTransport({});
  }

  private async initialize() {
    // Create a test account only once
    if (this.testAccount) {
      return;
    }

    this.testAccount = await nodemailer.createTestAccount();
    logger.info(`Ethereal test account created. Preview emails at: ${nodemailer.getTestMessageUrl(null as any)}`);
    logger.info(`Ethereal User: ${this.testAccount.user}`);
    logger.info(`Ethereal Pass: ${this.testAccount.pass}`);


    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.testAccount.user,
        pass: this.testAccount.pass,
      },
    });
  }

  private async sendEmail(mailOptions: nodemailer.SendMailOptions) {
    await this.initialize();
    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent: ${info.messageId}`);
      // Log the preview URL
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
          logger.info(`Preview URL: ${previewUrl}`);
      }
    } catch (error) {
        logger.error('Error sending email:', error);
    }
  }

  async sendNewInquiryAlert(inquiry: Inquiry, recipientEmail: string) {
    const subject = `New Inquiry Received: ID #${inquiry.id}`;
    const text = `A new inquiry has been received.\n\nDetails:\nID: ${inquiry.id}\nStatus: ${inquiry.status}\nNotes: ${inquiry.notes || 'N/A'}`;
    const html = `<p>A new inquiry has been received.</p><h3>Details:</h3><ul><li>ID: ${inquiry.id}</li><li>Status: ${inquiry.status}</li><li>Notes: ${inquiry.notes || 'N/A'}</li></ul>`;

    await this.sendEmail({
        from: '"System" <no-reply@propertymanager.com>',
        to: recipientEmail,
        subject: subject,
        text: text,
        html: html,
    });
  }

  async sendAppointmentReminder(appointment: Appointment, recipientEmail: string) {
    const subject = `Reminder: Appointment on ${new Date(appointment.date).toLocaleDateString()}`;
    const text = `This is a reminder for your upcoming appointment.\n\nDetails:\nID: ${appointment.id}\nDate: ${appointment.date}\nNotes: ${appointment.notes || 'N/A'}`;
    const html = `<p>This is a reminder for your upcoming appointment.</p><h3>Details:</h3><ul><li>ID: ${appointment.id}</li><li>Date: ${appointment.date}</li><li>Notes: ${appointment.notes || 'N/A'}</li></ul>`;

    await this.sendEmail({
        from: '"System" <no-reply@propertymanager.com>',
        to: recipientEmail,
        subject: subject,
        text: text,
        html: html,
    });
  }
}
