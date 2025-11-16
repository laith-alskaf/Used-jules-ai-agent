import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { createProductSchema, updateProductSchema } from './product.schema';


export class ProductController {
  private productService = new ProductService();

  async createProduct(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const validatedData = createProductSchema.parse(req.body);
      const product = await this.productService.createProduct(tenantId, validatedData);
      res.status(201).json({ success: true, data: product, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }

  async getProducts(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const products = await this.productService.getProducts(tenantId);
      res.json({ success: true, data: products, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const { id } = req.params;
      const product = await this.productService.getProductById(tenantId, id);
      res.json({ success: true, data: product, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const { id } = req.params;
      const validatedData = updateProductSchema.parse(req.body);
      const product = await this.productService.updateProduct(tenantId, id, validatedData);
      res.json({ success: true, data: product, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { tenantId } = req.user as { tenantId: string };
      const { id } = req.params;
      await this.productService.deleteProduct(tenantId, id);
      res.json({ success: true, data: null, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }
}
