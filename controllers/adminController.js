import User from '../models/User.js';

// ✅ جلب كل المستخدمين (فرق طوارئ، صيانة، مشرفين)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: '❌ فشل في جلب المستخدمين', error: err.message });
  }
};

// ✅ تعديل بيانات مستخدم
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, teamCode, role, password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });

    user.name = name || user.name;
    user.teamCode = teamCode || user.teamCode;
    user.role = role || user.role;
    user.password = password || user.password;

    const updated = await user.save();

    res.json({
      _id: updated._id,
      name: updated.name,
      role: updated.role,
      teamCode: updated.teamCode,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ فشل في تعديل المستخدم', error: err.message });
  }
};

// ✅ حذف مستخدم
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });

    await user.deleteOne();
    res.json({ message: '✅ تم حذف المستخدم بنجاح' });
  } catch (err) {
    res.status(500).json({ message: '❌ فشل في الحذف', error: err.message });
  }
};
export const createUser = async (req, res) => {
  const { name, teamCode, role, password } = req.body;

  try {
    const exists = await User.findOne({ teamCode });
    if (exists) {
      return res.status(400).json({ message: "⚠️ هذا الكود مستخدم بالفعل" });
    }

    const newUser = new User({
      name,
      teamCode,
      role,
      password
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      teamCode: savedUser.teamCode,
      role: savedUser.role
    });
  } catch (err) {
    res.status(500).json({ message: "❌ فشل في إنشاء المستخدم", error: err.message });
  }
};
