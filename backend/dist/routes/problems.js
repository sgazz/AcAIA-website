"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const problemController_1 = require("../controllers/problemController");
const router = (0, express_1.Router)();
router.post('/generate', auth_1.auth, (0, validation_1.validate)(validation_1.problemSchemas.generateProblem), problemController_1.generateProblem);
router.get('/', problemController_1.getProblems);
router.get('/:id', problemController_1.getProblem);
router.post('/:id/solve', auth_1.auth, (0, validation_1.validate)(validation_1.problemSchemas.solveProblem), problemController_1.solveProblem);
router.post('/:id/rate', auth_1.auth, (0, validation_1.validate)(validation_1.problemSchemas.rateProblem), problemController_1.rateProblem);
router.post('/', auth_1.auth, problemController_1.createProblem);
exports.default = router;
//# sourceMappingURL=problems.js.map