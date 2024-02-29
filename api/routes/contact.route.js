import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import submitContactForm from '../controllers/contact.Controller.js';

const router = express.Router();

router.post('/contact', verifyToken, submitContactForm);

export default router;
