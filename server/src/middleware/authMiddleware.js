import { verifyToken } from '../config/jwt.js';
import { FileDB } from '../config/db.js';

export const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }

  const userStore = new FileDB('users');
  const user = userStore.findById(decoded.id);

  if (!user) {
    return res.status(401).json({ success: false, message: 'User no longer exists' });
  }

  req.user = user;
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: Admin privileges required' });
  }
};
