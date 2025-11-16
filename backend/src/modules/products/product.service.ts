import { z } from 'zod';
import { ProductRepository } from './product.repository';
import { createProductSchema, updateProductSchema } from './product.schema';

export class ProductService {
  private productRepository = new ProductRepository();

  async createProduct(tenantId: string, data: z.infer<typeof createProductSchema>) {
    return this.productRepository.createProduct(tenantId, data);
  }

  async getProducts(tenantId: string) {
    return this.productRepository.getProducts(tenantId);
  }

  async getProductById(tenantId: string, id: string) {
    return this.productRepository.getProductById(tenantId, id);
  }

  async updateProduct(tenantId: string, id: string, data: z.infer<typeof updateProductSchema>) {
    return this.productRepository.updateProduct(tenantId, id, data);
  }

  async deleteProduct(tenantId: string, id: string) {
    return this.productRepository.deleteProduct(tenantId, id);
  }
}
