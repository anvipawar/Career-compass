import jwt from 'jsonwebtoken';
import axios from 'axios';

export const googleLogin = async (req, res) => {
    const { access_token } = req.body;
    try {
        // Verify token with Google
        const googleRes = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        const { email, name, picture } = googleRes.data;

        // Mock user creation/update logic
        // In a real app, you would check the database here
        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });

        res.json({
            token,
            user: { email, name, picture },
            message: 'Google login successful'
        });
    } catch (err) {
        console.error('Google Auth Error:', err);
        res.status(401).json({ message: 'Invalid Google token' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    // Mock login logic
    if (email && password) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        res.json({ token, user: { email, name: 'User' } });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    // Mock signup logic
    if (name && email && password) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        res.json({ token, user: { name, email } });
    } else {
        res.status(400).json({ message: 'Missing fields' });
    }
};
