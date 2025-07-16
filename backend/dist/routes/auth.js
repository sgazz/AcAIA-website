"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/register', (0, validation_1.validate)(validation_1.authSchemas.register), authController_1.register);
router.post('/login', (0, validation_1.validate)(validation_1.authSchemas.login), authController_1.login);
router.get('/me', auth_1.auth, authController_1.getCurrentUser);
router.put('/profile', auth_1.auth, (0, validation_1.validate)(validation_1.authSchemas.updateProfile), authController_1.updateProfile);
router.put('/password', auth_1.auth, (0, validation_1.validate)(validation_1.authSchemas.changePassword), authController_1.changePassword);
exports.default = router;
//# sourceMappingURL=auth.js.map