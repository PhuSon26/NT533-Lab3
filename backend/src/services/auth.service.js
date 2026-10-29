import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

function issueToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}
function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function registerUser({ name, email, password }) {
  const exists = await User.findOne({ email });
  if (exists) throw new AppError('Email is already registered', 409);
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  return { user: publicUser(user), token: issueToken(user) };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user || !(await user.verifyPassword(password))) {
    throw new AppError('Email or password is incorrect', 401);
  }
  return { user: publicUser(user), token: issueToken(user) };
}
