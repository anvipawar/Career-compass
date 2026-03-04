import express from 'express';
import { login, signup, googleLogin } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/google', googleLogin);

export default router;
