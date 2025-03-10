import express from "express";
import { addUser, generateUserPDF, getAllUsers, getUser } from "../controller/userController";

const router = express.Router();

router.post('/users',addUser);
router.get('/user/:id',getUser);
router.get('/users',getAllUsers);
router.get('/users/:id/generate-pdf', generateUserPDF);

export default router;