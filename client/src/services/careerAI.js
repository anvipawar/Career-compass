import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Send assessment data to the backend AI analysis endpoint.
 * @param {Object} formData - Student assessment data
 * @returns {Promise<Object>} - Structured AI career analysis
 */
export async function analyzeCareer(formData) {
    const response = await axios.post(`${API_BASE}/api/careers/analyze`, formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000, // 60s timeout for AI generation
    });
    return response.data;
}

/**
 * Send chat messages to the backend AI assistant endpoint.
 * @param {Array} messages - Chat history in [{role: 'user'|'assistant', text: string}] format
 * @returns {Promise<Object>} - AI response
 */
export async function chatWithAI(messages) {
    const response = await axios.post(`${API_BASE}/api/ai/chat`, { messages }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000,
    });
    return response.data;
}
