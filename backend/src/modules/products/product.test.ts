import request from 'supertest';
import app from '../../core/app';
import { ProductRepository } from './product.repository';
import { sign } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

jest.mock('./product.repository');

const mockedProductRepository = ProductRepository as jest.MockedClass<typeof ProductRepository>;
const privateKey = fs.readFileSync(path.join(__dirname, '../../../private_key.pem'), 'utf8');
const token = sign({ userId: '1', tenantId: '1' }, privateKey, { algorithm: 'RS256' });

describe('Product Module', () => {
  beforeEach(() => {
    mockedProductRepository.mockClear();
  });

  it('should create a new product', async () => {
    const product = { id: '1', sku: 'SKU-1', name: 'Test Product', price: 10, stockQty: 100, reorderLevel: 10, tenantId: '1' };

    mockedProductRepository.prototype.createProduct.mockResolvedValue(product);

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        sku: 'SKU-1',
        name: 'Test Product',
        price: 10,
        stockQty: 100,
        reorderLevel: 10,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('id');
  });

  it('should get all products', async () => {
    const products = [{ id: '1', sku: 'SKU-1', name: 'Test Product', price: 10, stockQty: 100, reorderLevel: 10, tenantId: '1' }];

    mockedProductRepository.prototype.getProducts.mockResolvedValue(products);

    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBe(1);
  });

  it('should get a product by ID', async () => {
    const product = { id: '1', sku: 'SKU-1', name: 'Test Product', price: 10, stockQty: 100, reorderLevel: 10, tenantId: '1' };

    mockedProductRepository.prototype.getProductById.mockResolvedValue(product);

    const res = await request(app)
      .get('/api/products/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('id');
  });

  it('should update a product', async () => {
    const product = { id: '1', sku: 'SKU-1', name: 'Updated Product', price: 15, stockQty: 150, reorderLevel: 15, tenantId: '1' };

    mockedProductRepository.prototype.updateProduct.mockResolvedValue(product);

    const res = await request(app)
      .patch('/api/products/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Product',
        price: 15,
        stockQty: 150,
        reorderLevel: 15,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.name).toBe('Updated Product');
  });

  it('should delete a product', async () => {
    const product = { id: '1', sku: 'SKU-1', name: 'Test Product', price: 10, stockQty: 100, reorderLevel: 10, tenantId: '1' };
    mockedProductRepository.prototype.deleteProduct.mockResolvedValue(product);

    const res = await request(app)
      .delete('/api/products/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
