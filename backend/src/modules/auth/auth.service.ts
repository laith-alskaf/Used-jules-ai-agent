import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { AuthRepository } from './auth.repository';
import { registerSchema, loginSchema } from './auth.schema';
import fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.join(__dirname, '../../../private_key.pem'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../../../public_key.pem'), 'utf8');

export class AuthService {
  private authRepository = new AuthRepository();

  async register(data: z.infer<typeof registerSchema>) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword,
    });
    return user;
  }

  async login(data: z.infer<typeof loginSchema>) {
    const user = await this.authRepository.findUserByEmail(data.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const accessToken = jwt.sign({ userId: user.id, tenantId: user.tenantId }, privateKey, {
      algorithm: 'RS256',
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ userId: user.id, tenantId: user.tenantId }, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refresh(token: string) {
    try {
      const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as { userId: string; tenantId: string };
      const accessToken = jwt.sign({ userId: decoded.userId, tenantId: decoded.tenantId }, privateKey, {
        algorithm: 'RS256',
        expiresIn: '15m',
      });
      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
