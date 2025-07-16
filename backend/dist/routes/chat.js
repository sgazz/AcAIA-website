"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@/middleware/auth");
const validation_1 = require("@/middleware/validation");
const chatController_1 = require("@/controllers/chatController");
const router = (0, express_1.Router)();
router.use(auth_1.auth);
router.post('/', (0, validation_1.validate)(validation_1.chatSchemas.createChat), chatController_1.createChat);
router.get('/', chatController_1.getChats);
router.get('/:id', chatController_1.getChat);
router.put('/:id', chatController_1.updateChat);
router.delete('/:id', chatController_1.deleteChat);
router.post('/:id/messages', (0, validation_1.validate)(validation_1.chatSchemas.sendMessage), chatController_1.sendMessage);
exports.default = router;
//# sourceMappingURL=chat.js.map