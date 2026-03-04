import React from 'react'
import { Link } from 'react-router-dom'
import { BrainCircuit, Target, TrendingUp, ChevronRight, Play, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    }

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 px-6">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-20 pointer-events-none">
                    <div className="absolute top-20 left-0 w-96 h-96 bg-primary rounded-full blur-[120px] animate-pulse-slow"></div>
                    <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary rounded-full blur-[120px] animate-pulse-slow transition-delay-1000"></div>
                </div>

                <motion.div
                    className="max-w-7xl mx-auto text-center"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered Career Evolution</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Navigate Your Future with <br />
                        <span className="text-gradient">Precision Intelligence</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Stop guessing your career path. Let our advanced AI analyze your unique skills and interests to map out the perfect professional journey tailored just for you.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/assessment" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
                            Start Assessment <ChevronRight className="w-4 h-4" />
                        </Link>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all w-full sm:w-auto justify-center">
                            <div className="bg-primary/20 p-1 rounded-full"><Play className="w-3 h-3 text-primary fill-primary" /></div>
                            See How It Works
                        </button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<BrainCircuit className="w-6 h-6 text-primary" />}
                            title="Skill Analysis"
                            description="In-depth evaluation of your technical and soft skills using advanced cognitive mapping."
                        />
                        <FeatureCard
                            icon={<TrendingUp className="w-6 h-6 text-secondary" />}
                            title="Market Trends"
                            description="Real-time integration with global job market data for high-demand path suggestions."
                        />
                        <FeatureCard
                            icon={<Target className="w-6 h-6 text-accent" />}
                            title="6-Month Roadmaps"
                            description="Actionable, step-by-step learning paths to bridge your skill gaps and reach your goals."
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Stats / Proof Section */}
            <section className="bg-muted/30 py-24 px-6 border-y border-white/5">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-around gap-12 text-center">
                    <Stat item="500+" label="Career Paths Analysed" />
                    <Stat item="98%" label="User Match Accuracy" />
                    <Stat item="10k+" label="Learning Resources" />
                    <Stat item="24/7" label="AI Career Support" />
                </div>
            </section>
        </div>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="glass-card p-8 text-left group hover:bg-muted/30 transition-all">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    )
}

function Stat({ item, label }) {
    return (
        <div>
            <div className="text-4xl font-bold text-gradient mb-1">{item}</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</div>
        </div>
    )
}
