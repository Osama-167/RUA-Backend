import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  teamCode: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['emergency', 'maintenance', 'supervisor', 'admin'],
    required: true
  },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('User', userSchema); // ✅ مهم جدًا
