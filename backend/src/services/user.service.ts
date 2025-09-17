import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const existingUser = await this.userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const userToCreate = {
      ...userData,
      password: hashedPassword,
    };

    return this.userRepository.createUser(userToCreate);
  }

  async login(loginData: Pick<User, 'email' | 'password'>): Promise<string | null> {
    const user = await this.userRepository.findUserByEmail(loginData.email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: '1h',
    });

    return token;
  }
}
