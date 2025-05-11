import Report from '../models/Report.js';
import path from 'path';

export const createReport = async (req, res) => {
  try {
    const { reports } = req.body;
    const inserted = await Report.insertMany(reports);
    res.status(201).json({ message: '✅ تم حفظ التقارير بنجاح', count: inserted.length });
  } catch (err) {
    res.status(500).json({ message: '❌ فشل في حفظ التقارير', error: err.message });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const all = await Report.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: '❌ فشل في تحميل التقارير', error: err.message });
  }
};

export const getReportsByTeam = async (req, res) => {
  const { team } = req.params;
  try {
    const teamReports = await Report.find({ team }).sort({ createdAt: -1 });
    res.json(teamReports);
  } catch (err) {
    res.status(500).json({ message: '❌ فشل في تحميل تقارير الفرقة', error: err.message });
  }
};
export const uploadReportWithImage = async (req, res) => {
  try {
    const {
      team,
      role,
      workType,
      note,
      date,
      taskNumber,
      subscriptionNumber,
      description,
    } = req.body;

    const reportData = {
      team,
      role,
      workType,
      note,
      date,
      taskNumber,
      subscriptionNumber,
      description,
    };

    // 🖼️ حفظ مسار الصورة إن وُجدت
    if (req.file) {
      reportData.image = req.file.path; // أو ممكن `${req.protocol}://${req.get("host")}/${req.file.path}` لو عايز رابط مباشر
    }

    const report = new Report(reportData);
    await report.save();

    res.status(201).json({ message: '✅ تم حفظ التقرير مع الصورة', report });
  } catch (err) {
    res.status(500).json({ message: '❌ فشل في رفع المهمة', error: err.message });
  }
};
