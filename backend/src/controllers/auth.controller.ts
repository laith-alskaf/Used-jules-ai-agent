import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.register(req.body);
      res.status(201).json({ message: req.t('auth.registerSuccess'), user });
    } catch (error: any) {
      if (error.message === 'User already exists') {
        res.status(409).json({ message: req.t('error.userExists') });
      } else {
        res.status(500).json({ message: req.t('error.generic'), error });
      }
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = await this.userService.login(req.body);
      if (!token) {
        res.status(401).json({ message: req.t('error.invalidCredentials') });
        return;
      }
      res.status(200).json({ message: req.t('auth.loginSuccess'), token });
    } catch (error) {
      res.status(500).json({ message: req.t('error.generic'), error });
    }
  };
}
