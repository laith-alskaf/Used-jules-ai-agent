import request from 'supertest';
import app from '../../core/app';
import { InvoiceRepository } from './invoice.repository';
import { sign } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

jest.mock('./invoice.repository');

const mockedInvoiceRepository = InvoiceRepository as jest.MockedClass<typeof InvoiceRepository>;
const privateKey = fs.readFileSync(path.join(__dirname, '../../../private_key.pem'), 'utf8');
const token = sign({ userId: '1', tenantId: '1' }, privateKey, { algorithm: 'RS256' });

describe('Invoice Module', () => {
  beforeEach(() => {
    mockedInvoiceRepository.mockClear();
  });

  it('should create a new invoice', async () => {
    const invoice = {
      id: '1',
      number: 'INV-001',
      type: 'sale',
      customerId: '1',
      total: 100,
      status: 'draft',
      tenantId: '1',
      createdAt: new Date(),
    };

    mockedInvoiceRepository.prototype.createInvoice.mockResolvedValue(invoice);

    const res = await request(app)
      .post('/api/invoices')
      .set('Authorization', `Bearer ${token}`)
      .send({
        number: 'INV-001',
        type: 'sale',
        customerId: '1',
        items: [
          {
            productId: '1',
            qty: 1,
            unitPrice: 100,
          },
        ],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('id');
  });

  it('should get all invoices', async () => {
    const invoices = [
      {
        id: '1',
        number: 'INV-001',
        type: 'sale',
        customerId: '1',
        total: 100,
        status: 'draft',
        tenantId: '1',
        createdAt: new Date(),
      },
    ];

    mockedInvoiceRepository.prototype.getInvoices.mockResolvedValue(invoices);

    const res = await request(app)
      .get('/api/invoices')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBe(1);
  });
});
