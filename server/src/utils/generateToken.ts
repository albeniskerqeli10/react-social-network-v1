import jwt, { Secret } from 'jsonwebtoken';

export const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN as Secret, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN as Secret, {
    expiresIn: '7d',
  });
};
