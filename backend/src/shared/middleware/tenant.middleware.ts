import { Request, Response, NextFunction } from 'express';

export const tenantMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as { tenantId: string };
  if (!user || !user.tenantId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // This is a simplified example. In a real application, you would use this
  // tenantId to scope all your database queries.
  console.log(`Request for tenantId: ${user.tenantId}`);
  next();
};
