import { InquiryRepository } from '../repositories/inquiry.repository';
import { Inquiry, Prisma } from '@prisma/client';

export class InquiryService {
  private inquiryRepository: InquiryRepository;

  constructor() {
    this.inquiryRepository = new InquiryRepository();
  }

  async createInquiry(data: Prisma.InquiryCreateInput): Promise<Inquiry> {
    return this.inquiryRepository.create(data);
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return this.inquiryRepository.findAll();
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
