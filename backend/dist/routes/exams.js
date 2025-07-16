"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const examController_1 = require("../controllers/examController");
const router = (0, express_1.Router)();
router.post('/generate', auth_1.auth, examController_1.generateExam);
router.get('/', examController_1.getExams);
router.get('/:id', examController_1.getExam);
router.post('/:id/submit', auth_1.auth, examController_1.submitExam);
router.get('/:id/results', auth_1.auth, examController_1.getExamResults);
router.get('/:id/stats', auth_1.auth, examController_1.getExamStats);
exports.default = router;
//# sourceMappingURL=exams.js.map