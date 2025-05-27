import express from 'express';
import {
  createReport,
  getAllReports,
  getReportsByTeam,
  uploadReportWithImage,
  deleteReportsByIds

} from '../controllers/reportController.js';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', createReport);
router.get('/', getAllReports);
router.get('/:team', getReportsByTeam);
router.post("/reports/batchDelete", deleteReportsByIds);
router.post('/upload', upload.single('image'), uploadReportWithImage);

export default router;
