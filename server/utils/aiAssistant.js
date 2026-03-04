const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * Call Gemini AI for a chat conversation.
 * @param {Array} messages - Chat history in [{role: 'user'|'assistant', text: string}] format
 * @returns {Promise<string>} - AI response text
 */
export async function getAIChatResponse(messages) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        throw new Error('Gemini API key not configured on the server.');
    }

    // Convert messages to Gemini format (user/model)
    // Filter to ensure alternating roles and valid sequence
    const contents = [];
    let lastRole = null;

    for (const msg of messages) {
        const role = msg.role === 'assistant' ? 'model' : 'user';
        if (role === lastRole) continue; // Skip consecutive same roles
        contents.push({
            role: role,
            parts: [{ text: msg.text }]
        });
        lastRole = role;
    }

    const systemInstruction = {
        parts: [{ text: "You are the CareerCompass AI Assistant, a friendly and expert career counselor for students in India. Your goal is to provide helpful, encouraging, and accurate guidance on: 1) Career paths and salaries in India (LPA format). 2) Top colleges (e.g., IITs, NITs, COEP, VJTI). 3) Skills and courses (coding, medical, commerce). 4) Exam preparation (JEE, NEET, CET, UPSC). 5) Job market trends. Keep your responses concise, professional, and full of emojis where appropriate. Always favor Indian context (colleges, companies, salaries)." }]
    };

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: systemInstruction,
                contents: contents,
                generationConfig: {
                    temperature: 0.8,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to call Gemini API');
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that. Please try again.";
    } catch (error) {
        console.error('Gemini Chat Error:', error);
        throw error;
    }
}
