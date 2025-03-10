"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserPDF = exports.getUser = exports.getAllUsers = exports.addUser = void 0;
const userModel_1 = require("../model/userModel");
const pdfService_1 = require("../service/pdfService");
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const userId = yield (0, userModel_1.createUser)(user);
        res.status(201).json({ id: userId, message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});
exports.addUser = addUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userModel_1.getUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = yield (0, userModel_1.getUserById)(userId);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});
exports.getUser = getUser;
const generateUserPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    const user = yield (0, userModel_1.getUserById)(userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    try {
        const pdfBuffer = yield (0, pdfService_1.generateCVPDF)(user);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${user.name}_CV.pdf`);
        res.send(pdfBuffer);
    }
    catch (error) {
        res.status(500).json({ message: 'Error generating PDF' });
    }
});
exports.generateUserPDF = generateUserPDF;
