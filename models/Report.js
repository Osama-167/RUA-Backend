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
taskNumber: {
  type: Number,
  required: true,
  unique: true
},
  subscriptionNumber: String,
  description: String,

  workType: String,

  note: String,
  image: String, 
  date: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);
