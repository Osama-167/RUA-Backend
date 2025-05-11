import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// توليد JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// ✅ تسجيل مستخدم جديد (بواسطة الأدمن فقط)
export const registerUser = async (req, res) => {
  const { name, teamCode, role, password } = req.body;

  try {
    // تحقق إذا كان الكود مكرر
    const existing = await User.findOne({ teamCode });
    if (existing) {
      return res.status(400).json({ message: 'الكود مستخدم بالفعل' });
    }

    const user = await User.create({
      name,
      teamCode,
      role,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'فشل إنشاء المستخدم', error: err.message });
  }
};

// ✅ تسجيل الدخول
export const loginUser = async (req, res) => {
  const { teamCode, password } = req.body;

  try {
    const user = await User.findOne({ teamCode });

    if (!user) {
      return res.status(401).json({ message: 'الكود غير صحيح' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'كلمة المرور غير صحيحة' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'فشل تسجيل الدخول', error: err.message });
  }
};
