import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// ✅ POST /api/users/register → يُستخدم فقط من قبل الأدمن
router.post('/register', registerUser);

// ✅ POST /api/users/login → تسجيل الدخول لجميع المستخدمين
router.post('/login', loginUser);

export default router;
