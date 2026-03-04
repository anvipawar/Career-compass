import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowLeft,
    BookOpen,
    Wrench,
    Code2,
    Award,
    CheckCircle,
    Circle,
    Calendar,
    DollarSign,
    TrendingUp,
    Layers
} from 'lucide-react'

const CAREER_DATA = {
    'fullstack': {
        title: 'Full Stack Developer',
        suitability: 'Your strong foundation in React.js and interest in Web Development makes this a perfect match. You have the logical thinking required for backend and the creative eye for frontend.',
        salary: '$85,000 - $145,000',
        demand: 'High',
        missingSkills: ['Node.js (Advanced)', 'Docker', 'PostgreSQL', 'GraphQL'],
        roadmap: [
            { month: 'Month 1', title: 'Advanced Frontend & State Management', items: ['Master Redux/Zustand', 'Advanced React Patterns', 'Tailwind CSS animations'], icon: <Layers /> },
            { month: 'Month 2', title: 'Backend Foundation', items: ['Node.js Essentials', 'Express.js Routing', 'REST API Design'], icon: <Code2 /> },
            { month: 'Month 3', title: 'Databases & Auth', items: ['PostgreSQL Schema Design', 'JWT Authentication', 'ORM (Prisma/TypeORM)'], icon: <Circle /> },
            { month: 'Month 4', title: 'Full Stack Integration', items: ['Connecting Frontend to Backend', 'Real-time features with Socket.io', 'Unit Testing'], icon: <BookOpen /> },
            { month: 'Month 5', title: 'DevOps & Deployment', items: ['Docker Containerization', 'CI/CD Pipelines', 'AWS/Vercel Deployment'], icon: <Wrench /> },
            { month: 'Month 6', title: 'Portfolio & Capstone', items: ['Building a production-grade app', 'Optimizing for Core Web Vitals', 'Interview Prep'], icon: <Award /> },
        ]
    },
    // Other careers would follow same structure
}

export default function CareerDetails() {
    const { id } = useParams()
    const career = CAREER_DATA[id] || CAREER_DATA['fullstack'] // Fallback for demo

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    {/* Header */}
                    <section>
                        <h1 className="text-4xl font-bold mb-4">{career.title}</h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">{career.suitability}</p>
                    </section>

                    {/* Roadmap */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-primary" /> 6-Month Mastery Roadmap
                        </h2>
                        <div className="space-y-6">
                            {career.roadmap.map((item, index) => (
                                <div key={index} className="flex gap-6 group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            {index + 1}
                                        </div>
                                        {index !== career.roadmap.length - 1 && (
                                            <div className="w-0.5 h-full bg-border group-hover:bg-primary/20 transition-colors"></div>
                                        )}
                                    </div>
                                    <div className="pb-8 space-y-3">
                                        <div className="text-sm font-bold text-primary uppercase tracking-wider">{item.month}</div>
                                        <h3 className="text-xl font-bold">{item.title}</h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {item.items.map((sub, i) => (
                                                <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                                                    <CheckCircle className="w-3 h-3 text-secondary" /> {sub}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="glass-card p-6 space-y-6">
                        <h3 className="text-lg font-bold">Quick Insights</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-500/10"><DollarSign className="w-5 h-5 text-green-500" /></div>
                                <div>
                                    <div className="text-xs text-muted-foreground uppercase">Est. Salary</div>
                                    <div className="font-bold">{career.salary}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/10"><TrendingVertical className="w-5 h-5 text-blue-500" /></div>
                                <div>
                                    <div className="text-xs text-muted-foreground uppercase">Market Demand</div>
                                    <div className="font-bold">{career.demand}</div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-muted-foreground">Skill Gap Analysis</h4>
                            <div className="space-y-2">
                                {career.missingSkills.map(skill => (
                                    <div key={skill} className="flex items-center gap-2 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                        <h3 className="text-lg font-bold mb-3">Expert Advice</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            "Focus on building 2-3 high-quality projects this month. Real-world implementation is better than 10 certificates."
                        </p>
                        <button className="text-primary text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                            Chat with AI Mentor <ArrowLeft className="w-4 h-4 rotate-180" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
