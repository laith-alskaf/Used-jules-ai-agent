import request from 'supertest';
import app from '../../core/app';
import { AuthRepository } from './auth.repository';

jest.mock('./auth.repository');

const mockedAuthRepository = AuthRepository as jest.MockedClass<typeof AuthRepository>;

describe('Auth Module', () => {
  beforeEach(() => {
    mockedAuthRepository.mockClear();
  });

  it('should register a new user', async () => {
    const tenant = { id: '1', name: 'Test Tenant', currency: 'USD', timezone: 'UTC', createdAt: new Date() };
    const user = { id: '1', email: 'test@example.com', passwordHash: 'hashedpassword', tenantId: '1', name: 'Test User', role: 'user', createdAt: new Date() };

    mockedAuthRepository.prototype.createUser.mockResolvedValue({ user, tenant });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password',
        tenantName: 'Test Tenant',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('user');
  });

  it('should login an existing user', async () => {
    const user = { id: '1', email: 'test@example.com', passwordHash: 'hashedpassword', tenantId: '1', name: 'Test User', role: 'user', createdAt: new Date() };

    // Mock bcrypt.compare to resolve to true
    const bcrypt = require('bcrypt');
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    mockedAuthRepository.prototype.findUserByEmail.mockResolvedValue(user);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('refreshToken');
  });

  it('should refresh the access token', async () => {
    const authService = require('./auth.service');
    jest.spyOn(authService.AuthService.prototype, 'refresh').mockResolvedValue({ accessToken: 'new-access-token' });

    const res = await request(app)
      .post('/api/auth/refresh')
      .send({
        refreshToken: 'some-refresh-token',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('accessToken');
  });
});
