import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Compass, Menu, X, Rocket, Sun, Moon } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '../context/ThemeContext'

function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Assessment', path: '/assessment' },
        { name: 'Colleges', path: '/colleges' },
        { name: 'Jobs', path: '/jobs' },
        { name: 'Courses', path: '/courses' },
        { name: 'Dashboard', path: '/dashboard' },
    ]

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 group">
                    <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                        <Compass className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        CareerCompass<span className="text-primary">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary transition-all"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    <Link to="/login" className="btn-primary py-2 px-5 text-sm flex items-center gap-2">
                        <Rocket className="w-4 h-4" />
                        Get Started
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground p-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-card border-b border-white/10 px-6 py-8 absolute top-full left-0 right-0 flex flex-col space-y-4 animate-fade-in shadow-2xl">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-lg font-medium",
                                    location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-muted/50 text-muted-foreground font-medium"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
                            {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        </button>
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="btn-primary text-center"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
