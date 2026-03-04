import express from 'express';
import { analyzeCareerWithAI } from '../utils/aiAnalysis.js';

const router = express.Router();

// POST /api/careers/analyze — Real Gemini AI career analysis
router.post('/analyze', async (req, res) => {
    try {
        const userData = req.body;

        // Validate required fields
        if (!userData.name || !userData.stream || !userData.favouriteSubject) {
            return res.status(400).json({ message: 'Missing required fields: name, stream, favouriteSubject' });
        }

        const analysis = await analyzeCareerWithAI(userData);
        res.json({ success: true, data: analysis });
    } catch (error) {
        console.error('AI Analysis Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating career analysis. Please check your API key.',
            error: error.message
        });
    }
});

// Legacy recommend route kept for backward compatibility
router.post('/recommend', async (req, res) => {
    res.json({ message: 'Use /api/careers/analyze for AI-powered recommendations' });
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        res.json({ id, message: 'Career details fetched' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching career details' });
    }
});

export default router;
