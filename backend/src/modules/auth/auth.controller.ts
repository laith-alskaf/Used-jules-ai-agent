import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { registerSchema, loginSchema } from './auth.schema';

export class AuthController {
  private authService = new AuthService();

  async register(req: Request, res: Response) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const user = await this.authService.register(validatedData);
      res.status(201).json({ success: true, data: user, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const tokens = await this.authService.login(validatedData);
      res.json({ success: true, data: tokens, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const tokens = await this.authService.refresh(refreshToken);
      res.json({ success: true, data: tokens, error: null });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: error.message } });
      } else {
        res.status(400).json({ success: false, data: null, error: { code: 'BAD_REQUEST', message: 'An unknown error occurred' } });
      }
    }
  }
}
