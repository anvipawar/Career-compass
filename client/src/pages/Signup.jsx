import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react'

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
)

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Mock signup
        if (name && email && password) {
            navigate('/assessment')
        } else {
            setError('Please fill in all fields')
        }
    }

    const handleGoogle = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`, {
                    access_token: response.access_token
                });
                localStorage.setItem('token', res.data.token);
                navigate('/assessment');
            } catch (err) {
                console.error('Google Sign-Up Error:', err);
                setError('Google authentication failed. Please try again.');
            }
        },
        onError: () => setError('Google Sign-Up failed')
    });

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12">
            <div className="glass-card w-full max-w-md p-8 sm:p-10">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-2xl bg-secondary/10 mb-4">
                        <UserPlus className="w-8 h-8 text-secondary" />
                    </div>
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-muted-foreground mt-2">Join thousands shaping their future</p>
                </div>

                {/* Google Sign Up */}
                <button onClick={handleGoogle} id="google-signup-btn"
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-medium text-sm mb-5">
                    <GoogleIcon />
                    Sign up with Google
                </button>
                <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-muted-foreground">or sign up with email</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="input-field pl-12"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="input-field pl-12"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="input-field pl-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-secondary w-full py-4 text-lg">
                        Create Account
                    </button>
                </form>

                <p className="text-center mt-8 text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="text-secondary font-semibold hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    )
}
