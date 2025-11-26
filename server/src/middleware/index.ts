import { Request, Response, NextFunction } from 'express';

// Example middleware
export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
};

// Add more middleware as needed
