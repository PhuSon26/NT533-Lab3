import { asyncHandler } from '../utils/asyncHandler.js';
import * as authService from '../services/auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json({ success: true, data: result });
});
export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.json({ success: true, data: result });
});
export const me = asyncHandler(async (req, res) => {
  const { id, name, email, role } = req.user;
  res.json({ success: true, data: { user: { id, name, email, role } } });
});
