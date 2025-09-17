import { InquiryRepository } from '../repositories/inquiry.repository';
import { Inquiry, Prisma } from '@prisma/client';
import { EmailService } from './email.service';
import logger from './logger';

export class InquiryService {
  private inquiryRepository: InquiryRepository;
  private emailService: EmailService;

  constructor() {
    this.inquiryRepository = new InquiryRepository();
    this.emailService = new EmailService();
  }

  async createInquiry(data: Prisma.InquiryCreateInput): Promise<Inquiry> {
    const newInquiry = await this.inquiryRepository.create(data);

    // Send notification email
    const recipientEmail = process.env.BUSINESS_OWNER_EMAIL;
    if (recipientEmail) {
      this.emailService.sendNewInquiryAlert(newInquiry, recipientEmail).catch(error => {
        // Log the error but don't block the main response
        logger.error('Failed to send new inquiry email:', error);
      });
    } else {
      logger.warn('BUSINESS_OWNER_EMAIL not set. Skipping new inquiry notification.');
    }

    return newInquiry;
  }

  async getAllInquiries(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = limit;

    const inquiries = await this.inquiryRepository.findAll(skip, take);
    const totalInquiries = await this.inquiryRepository.countAll();

    return {
      data: inquiries,
      total: totalInquiries,
      page,
      limit,
      totalPages: Math.ceil(totalInquiries / limit),
    };
  }

  async getInquiryById(id: number): Promise<Inquiry | null> {
    return this.inquiryRepository.findById(id);
  }

  async updateInquiry(id: number, data: Prisma.InquiryUpdateInput): Promise<Inquiry | null> {
    return this.inquiryRepository.update(id, data);
  }

  async deleteInquiry(id: number): Promise<Inquiry | null> {
    return this.inquiryRepository.delete(id);
  }
}
