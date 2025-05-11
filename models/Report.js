import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  team: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['emergency', 'maintenance'],
    required: true,
  },
  // مهام الطوارئ
  taskNumber: String,
  subscriptionNumber: String,
  description: String,

  // مهام الصيانة
  workType: String,

  // مشترك للطوارئ والصيانة
  note: String,
  image: String, // path أو base64
  date: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);
