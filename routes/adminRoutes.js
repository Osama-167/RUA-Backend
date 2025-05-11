import express from 'express';
import {
  getAllUsers,
  updateUser,
  deleteUser,
  createUser // ✅ أضفنا دالة إنشاء المستخدم
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', getAllUsers);        // جلب كل المستخدمين
router.post('/users', createUser);        // ✅ إنشاء مستخدم جديد
router.put('/users/:id', updateUser);     // تعديل مستخدم
router.delete('/users/:id', deleteUser);  // حذف مستخدم

export default router;
