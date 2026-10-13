import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'careerpath_ai_super_secret_jwt_key_2026';

export const generateToken = (userId, role = 'student') => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
