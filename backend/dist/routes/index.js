"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const chat_1 = __importDefault(require("./chat"));
const problems_1 = __importDefault(require("./problems"));
const exams_1 = __importDefault(require("./exams"));
const career_1 = __importDefault(require("./career"));
const router = (0, express_1.Router)();
const API_PREFIX = '/api/v1';
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV
    });
});
router.get('/', (req, res) => {
    res.json({
        message: 'AcAIA Backend API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            auth: `${API_PREFIX}/auth`,
            chat: `${API_PREFIX}/chat`,
            problems: `${API_PREFIX}/problems`,
            exams: `${API_PREFIX}/exams`,
            career: `${API_PREFIX}/career`
        }
    });
});
router.use(`${API_PREFIX}/auth`, auth_1.default);
router.use(`${API_PREFIX}/chat`, chat_1.default);
router.use(`${API_PREFIX}/problems`, problems_1.default);
router.use(`${API_PREFIX}/exams`, exams_1.default);
router.use(`${API_PREFIX}/career`, career_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map