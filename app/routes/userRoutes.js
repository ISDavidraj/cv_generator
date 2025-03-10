"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.post('/users', userController_1.addUser);
router.get('/user/:id', userController_1.getUser);
router.get('/users', userController_1.getAllUsers);
router.get('/users/:id/generate-pdf', userController_1.generateUserPDF);
exports.default = router;
