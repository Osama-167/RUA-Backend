import Report from '../models/Report.js';
import path from 'path';

export const createReport = async (req, res) => {
  try {
    const { reports } = req.body;

    const cleanedReports = reports.map((r) => ({
      ...r,
      taskNumber: parseInt(r.taskNumber),
    }));

    const taskNumbers = cleanedReports.map((r) => r.taskNumber);
    const existing = await Report.find({ taskNumber: { $in: taskNumbers } });

    if (existing.length > 0) {
      const existingNumbers = existing.map((r) => r.taskNumber);
      return res.status(400).json({
        message: '❌ بعض أرقام المهام موجودة بالفعل',
        existingTaskNumbers: existingNumbers,
      });
    }

    const inserted = await Report.insertMany(cleanedReports);
    res.status(201).json({
      message: '✅ تم حفظ التقارير بنجاح',
      count: inserted.length,
    });
  } catch (err) {
    res.status(500).json({
      message: '❌ فشل في حفظ التقارير',
      error: err.message,
    });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const all = await Report.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({
      message: '❌ فشل في تحميل التقارير',
      error: err.message,
    });
  }
};

export const getReportsByTeam = async (req, res) => {
  const { team } = req.params;
  try {
    const teamReports = await Report.find({ team }).sort({ createdAt: -1 });
    res.json(teamReports);
  } catch (err) {
    res.status(500).json({
      message: '❌ فشل في تحميل تقارير الفرقة',
      error: err.message,
    });
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

    const numericTaskNumber = parseInt(taskNumber);

    if (isNaN(numericTaskNumber)) {
      return res.status(400).json({ message: "❌ رقم المهمة يجب أن يكون رقميًا فقط." });
    }

    const existing = await Report.findOne({ taskNumber: numericTaskNumber });

    if (existing) {
      // هنا عدلت الكود من 400 إلى 409
      return res.status(409).json({ message: "✅ التقرير موجود بالفعل." });
    }

    const reportData = {
      team,
      role,
      workType,
      note,
      date,
      taskNumber: numericTaskNumber,
      subscriptionNumber,
      description,
    };

    if (req.file) {
      reportData.image = req.file.path;
    }

    const report = new Report(reportData);
    await report.save();

    res.status(201).json({
      message: '✅ تم حفظ التقرير مع الصورة',
      report,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: '❌ فشل في رفع المهمة',
      error: err.message,
    });
  }
};


export const deleteReportsByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        message: '❌ يجب إرسال مصفوفة تحتوي على معرفات التقارير',
      });
    }

    const result = await Report.deleteMany({ _id: { $in: ids } });

    res.json({
      message: `✅ تم حذف ${result.deletedCount} تقرير/تقارير`,
    });
  } catch (err) {
    res.status(500).json({
      message: '❌ فشل في حذف التقارير',
      error: err.message,
    });
  }
};
