import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Trophy,
    TrendingUp,
    Target,
    ArrowRight,
    ExternalLink,
    Zap,
    CheckCircle2,
    Clock
} from 'lucide-react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts'

const MOCK_CAREERS = [
    {
        id: 'fullstack',
        title: 'Full Stack Developer',
        matchScore: 95,
        demand: 'High',
        salary: '$80k - $150k',
        description: 'Build complete web applications from database to user interface.',
        gradient: 'from-blue-500 to-cyan-500',
        skills: [
            { name: 'Frontend', score: 90 },
            { name: 'Backend', score: 85 },
            { name: 'Database', score: 70 },
            { name: 'DevOps', score: 60 },
        ]
    },
    {
        id: 'ai-engineer',
        title: 'AI Solutions Architect',
        matchScore: 88,
        demand: 'Very High',
        salary: '$120k - $200k',
        description: 'Design and implement intelligent systems using modern AI models.',
        gradient: 'from-purple-500 to-pink-500',
        skills: [
            { name: 'Python', score: 95 },
            { name: 'ML Models', score: 80 },
            { name: 'Cloud API', score: 75 },
            { name: 'Data Eng', score: 65 },
        ]
    },
    {
        id: 'product-designer',
        title: 'Product Designer',
        matchScore: 82,
        demand: 'Medium',
        salary: '$70k - $130k',
        description: 'Shape the user experience and visual design of digital products.',
        gradient: 'from-orange-500 to-amber-500',
        skills: [
            { name: 'UI Design', score: 90 },
            { name: 'UX Research', score: 75 },
            { name: 'Prototyping', score: 85 },
            { name: 'Strategy', score: 60 },
        ]
    }
]

export default function Dashboard() {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate AI computing results
        const timer = setTimeout(() => setIsLoading(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Analyzing Your Profile</h2>
                    <p className="text-muted-foreground animate-pulse">Our AI is matching your skills with market demands...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Your Career Potential</h1>
                    <p className="text-muted-foreground text-lg">Based on your skills in AI, Web Dev, and Problem Solving.</p>
                </div>
                <div className="flex items-center gap-4 bg-muted/30 border border-border p-4 rounded-2xl">
                    <div className="bg-primary/20 p-2 rounded-xl">
                        <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Overall Match</div>
                        <div className="text-2xl font-bold text-gradient">92% Profile Fit</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main List */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" /> Top Recommended Paths
                    </h2>

                    <div className="grid grid-cols-1 gap-6">
                        {MOCK_CAREERS.map((career, index) => (
                            <motion.div
                                key={career.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group glass-card p-6 flex flex-col md:flex-row gap-6 hover:bg-muted/30 transition-all cursor-pointer"
                            >
                                <div className={`w-full md:w-32 h-32 rounded-2xl bg-gradient-to-br ${career.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                                    <div className="text-3xl font-bold text-white">{career.matchScore}%</div>
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{career.title}</h3>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full border border-border">
                                            <TrendingUp className="w-4 h-4 text-primary" />
                                            <span className="text-xs font-semibold">{career.demand} Demand</span>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mb-4 line-clamp-2">{career.description}</p>

                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="text-sm font-medium">Avg. Salary: <span className="text-foreground">{career.salary}</span></div>
                                        <Link to={`/career/${career.id}`} className="ml-auto flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                                            View Roadmap <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar / Stats */}
                <div className="space-y-8">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-secondary" /> Skill Distribution
                    </h2>

                    <div className="glass-card p-6 h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MOCK_CAREERS[0].skills} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={80} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                                />
                                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                                    {MOCK_CAREERS[0].skills.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#38bdf8' : '#a855f7'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-accent" /> Recent Activity
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-3 text-sm">
                                <div className="w-1 h-10 bg-primary/40 rounded-full"></div>
                                <div>
                                    <div className="font-medium">Assessment Completed</div>
                                    <div className="text-muted-foreground text-xs font-mono">2 mins ago</div>
                                </div>
                            </div>
                            <div className="flex gap-3 text-sm opacity-50">
                                <div className="w-1 h-10 bg-white/10 rounded-full"></div>
                                <div>
                                    <div className="font-medium">Profile Setup</div>
                                    <div className="text-muted-foreground text-xs font-mono">10 mins ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
