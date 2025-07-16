"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const careerController_1 = require("../controllers/careerController");
const router = (0, express_1.Router)();
router.post('/advice', auth_1.auth, careerController_1.generateCareerAdvice);
router.get('/paths', careerController_1.getCareerPaths);
router.get('/learning-path', careerController_1.getLearningPath);
router.post('/assessment', auth_1.auth, careerController_1.assessSkills);
exports.default = router;
//# sourceMappingURL=career.js.map