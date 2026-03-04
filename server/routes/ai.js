import express from 'express';
import { getAIChatResponse } from '../utils/aiAssistant.js';

const router = express.Router();

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ message: 'Invalid or missing messages array.' });
        }

        const reply = await getAIChatResponse(messages);
        res.json({ success: true, reply });
    } catch (error) {
        console.error('AI Chat Route Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error communicating with AI assistant.',
            error: error.message
        });
    }
});

export default router;
