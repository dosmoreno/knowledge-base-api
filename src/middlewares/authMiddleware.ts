import { Request, Response, NextFunction } from 'express';

// Mock function to verify if the user is authenticated (you can replace this with actual logic)
const isAuthenticated = (req: Request): boolean => {
  // Simulate checking for a token in the headers (replace with your actual logic)
  const token = req.headers['authorization'];
  if (!token) return false;
  return token === 'valid-token'; // Simulate a token check
};

// Mock function to check the user's role (you can replace this with actual role-based checks)
const hasPermission = (role: string, requiredRole: string): boolean => {
  const roles = ['Admin', 'Editor', 'Viewer']; // Define roles as needed
  return roles.indexOf(role) >= roles.indexOf(requiredRole);
};

// Authentication middleware to verify user
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ message: 'Unauthorized: No valid token provided.' });
  }
  next();
};

// Authorization middleware to check if user has specific role
export const permissionMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.headers['role'] as string; // Simulating user role passed in headers
    if (!userRole || !hasPermission(userRole, requiredRole)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
    }
    next();
  };
};
