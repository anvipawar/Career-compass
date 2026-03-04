import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Trophy, TrendingUp, Target, Zap, CheckCircle2,
    Download, Lightbulb, Star, BookOpen,
    Shield, Sparkles, ChevronDown, ChevronUp,
    Clock, RotateCcw, BrainCircuit, BarChart
} from 'lucide-react'

// Colour maps for badges
const demandColors = {
    'Very High': 'text-green-400 bg-green-400/10 border-green-400/30',
    'High': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    'Medium': 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    'Low': 'text-red-400 bg-red-400/10 border-red-400/30'
}
const riskColors = {
    'Low': 'text-green-400 bg-green-400/10 border-green-400/30',
    'Medium': 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    'High': 'text-red-400 bg-red-400/10 border-red-400/30'
}
const importanceColors = {
    'Critical': 'text-red-400 bg-red-400/10 border-red-400/30',
    'Important': 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    'Good to Have': 'text-green-400 bg-green-400/10 border-green-400/30'
}

export default function AIResults() {
    const location = useLocation()
    const navigate = useNavigate()
    const printRef = useRef()
    const [expandedCareer, setExpandedCareer] = useState(0)

    const analysis = location.state?.analysis
    const formData = location.state?.formData

    if (!analysis) {
        navigate('/assessment')
        return null
    }

    const handleDownloadPDF = () => {
        const style = document.createElement('style')
        style.innerHTML = `
            @media print {
                body * { visibility: hidden; }
                #ai-results-print, #ai-results-print * { visibility: visible; }
                #ai-results-print { position: absolute; left: 0; top: 0; width: 100%; background: #0f172a; color: white; }
                .no-print { display: none !important; }
            }
        `
        document.head.appendChild(style)
        window.print()
        document.head.removeChild(style)
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Ambient background */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-[120px]" />
            </div>

            <div ref={printRef} id="ai-results-print" className="max-w-5xl mx-auto px-6 py-12 space-y-10">

                {/* ── Header ── */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>AI Career Analysis Report · India-Focused · Powered by Gemini</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        {formData?.name ? `${formData.name}'s` : 'Your'} <span className="text-gradient">Career Blueprint</span>
                    </h1>
                    <p className="text-muted-foreground mb-6">
                        Generated on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <div className="flex items-center justify-center gap-4 no-print">
                        <button onClick={handleDownloadPDF} className="btn-primary flex items-center gap-2">
                            <Download className="w-4 h-4" /> Download as PDF
                        </button>
                        <button onClick={() => navigate('/assessment')}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm font-medium">
                            <RotateCcw className="w-4 h-4" /> Retake Assessment
                        </button>
                    </div>
                </motion.div>

                {/* ── Overall Fit Banner ── */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                    className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative w-28 h-28 flex-shrink-0">
                        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" stroke="rgba(255,255,255,0.05)" />
                            <motion.circle cx="50" cy="50" r="42" fill="none" strokeWidth="8"
                                stroke="url(#scoreGrad)" strokeLinecap="round"
                                initial={{ strokeDasharray: `0 ${2 * Math.PI * 42}` }}
                                animate={{ strokeDasharray: `${2 * Math.PI * 42 * ((analysis.overallFit || 85) / 100)} ${2 * Math.PI * 42}` }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                            />
                            <defs>
                                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#22d3ee" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-gradient">{analysis.overallFit || 85}%</span>
                            <span className="text-xs text-muted-foreground">Fit Score</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-5 h-5 text-amber-400" />
                            <h2 className="text-xl font-bold">Your Academic & Personality Profile</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{analysis.profileSummary}</p>
                    </div>
                </motion.div>

                {/* ── Career Recommendations ── */}
                <section>
                    <SectionHeader icon={<Target className="w-5 h-5 text-cyan-400" />} title="Top 3 Career Recommendations" />
                    <div className="space-y-4">
                        {analysis.careers?.map((career, idx) => (
                            <CareerCard key={idx} career={career} idx={idx}
                                isExpanded={expandedCareer === idx}
                                onToggle={() => setExpandedCareer(expandedCareer === idx ? -1 : idx)} />
                        ))}
                    </div>
                </section>

                {/* ── 6-Month Roadmap ── */}
                {analysis.roadmap && (
                    <section>
                        <SectionHeader icon={<Zap className="w-5 h-5 text-purple-400" />} title={analysis.roadmap.title || '6-Month Action Roadmap'} />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {analysis.roadmap.steps?.map((step, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }} className="glass-card p-6">
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${idx === 0 ? 'bg-cyan-500/15 text-cyan-400' : idx === 1 ? 'bg-purple-500/15 text-purple-400' : 'bg-green-500/15 text-green-400'}`}>
                                        {step.month}
                                    </div>
                                    <h4 className="font-bold mb-3">{step.focus}</h4>
                                    <ul className="space-y-2">
                                        {step.tasks?.map((task, ti) => (
                                            <li key={ti} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── Skill Gap Analysis ── */}
                {analysis.skillGaps?.length > 0 && (
                    <section>
                        <SectionHeader icon={<BookOpen className="w-5 h-5 text-amber-400" />} title="Skill Gap Analysis" />
                        <div className="glass-card overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/3">
                                            <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Skill to Acquire</th>
                                            <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Importance</th>
                                            <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Time to Learn</th>
                                            <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Resource</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {analysis.skillGaps.map((gap, i) => (
                                            <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                                <td className="px-5 py-3 font-medium">{gap.skill}</td>
                                                <td className="px-5 py-3">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${importanceColors[gap.importance] || 'text-white/60 bg-white/5 border-white/10'}`}>
                                                        {gap.importance}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 text-muted-foreground">
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5" />{gap.timeToLearn}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <a href={gap.resourceLink} target="_blank" rel="noopener noreferrer"
                                                        className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
                                                        Learn →
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Future-Proof Score ── */}
                <section>
                    <SectionHeader icon={<Shield className="w-5 h-5 text-green-400" />} title="Future-Proof Score (AI/Automation Impact)" />
                    <div className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6">
                        <FutureProofMeter score={analysis.futureProofScore || 75} />
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold">Automation Resilience</h3>
                                <ScoreTag score={analysis.futureProofScore || 75} />
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{analysis.futureProofAnalysis}</p>
                        </div>
                    </div>
                </section>

                {/* ── Motivational Message ── */}
                {analysis.motivationalMessage && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="relative glass-card p-8 text-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
                        <Star className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-4 text-gradient">A Message for {formData?.name || 'You'} ✨</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto italic">
                            "{analysis.motivationalMessage}"
                        </p>
                    </motion.div>
                )}

                {/* ── Bottom CTA ── */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 no-print pb-4">
                    <button onClick={handleDownloadPDF} className="btn-primary flex items-center gap-2">
                        <Download className="w-4 h-4" /> Download PDF Report
                    </button>
                    <button onClick={() => navigate('/assessment')}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all font-medium">
                        <RotateCcw className="w-4 h-4" /> Start New Assessment
                    </button>
                </div>

            </div>
        </div>
    )
}

// ─── Career Card ─────────────────────────────────────────────────────────────
function CareerCard({ career, idx, isExpanded, onToggle }) {
    const gradients = ['from-cyan-500 to-blue-600', 'from-purple-500 to-pink-600', 'from-orange-500 to-amber-500']
    const gradient = career.gradient || gradients[idx] || gradients[0]

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }} className="glass-card overflow-hidden">

            <div className="p-6 cursor-pointer" onClick={onToggle}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Match circle */}
                    <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-white`}>
                        <span className="text-2xl font-bold">{career.matchPercent}%</span>
                        <span className="text-xs opacity-80">Match</span>
                    </div>

                    <div className="flex-grow min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground font-mono">#{career.rank || idx + 1}</span>
                            <h3 className="text-xl font-bold">{career.title}</h3>
                        </div>

                        {/* Animated progress bar */}
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                            <motion.div className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${career.matchPercent}%` }}
                                transition={{ duration: 1, delay: idx * 0.2, ease: 'easeOut' }} />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {/* Salary */}
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border text-green-400 bg-green-400/10 border-green-400/20">
                                ₹ {career.salaryRange}
                            </span>
                            {/* Demand */}
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${demandColors[career.demandLevel] || 'text-white/60 bg-white/5 border-white/10'}`}>
                                <TrendingUp className="w-3 h-3 inline mr-1" />{career.demandLevel} Demand
                            </span>
                            {/* AI Risk */}
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${riskColors[career.automationRisk] || 'text-white/60 bg-white/5 border-white/10'}`}>
                                <Shield className="w-3 h-3 inline mr-1" />{career.automationRisk} AI Risk
                            </span>
                        </div>
                    </div>

                    <div className="flex-shrink-0 no-print">
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6 space-y-4 border-t border-white/5 pt-5">
                            <div>
                                <h4 className="text-sm font-semibold text-muted-foreground mb-2">Why This Career Fits You</h4>
                                <p className="text-sm leading-relaxed">{career.reasoning}</p>
                            </div>
                            {career.skills?.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Key Skills You'll Need</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {career.skills.map(skill => (
                                            <span key={skill} className="px-3 py-1 rounded-lg bg-white/5 border border-white/8 text-xs font-medium">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {career.topColleges?.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Top Colleges in India</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {career.topColleges.map(col => (
                                            <span key={col} className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">{col}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function SectionHeader({ icon, title }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-2">{icon}</div>
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
    )
}

function FutureProofMeter({ score }) {
    const color = score >= 75 ? '#22c55e' : score >= 55 ? '#f59e0b' : '#ef4444'
    const circumference = 2 * Math.PI * 36
    const dash = circumference * (score / 100)

    return (
        <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill="none" strokeWidth="7" stroke="rgba(255,255,255,0.05)" />
                <motion.circle cx="40" cy="40" r="36" fill="none" strokeWidth="7"
                    stroke={color} strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{ strokeDasharray: `${dash} ${circumference}` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold" style={{ color }}>{score}</span>
                <span className="text-xs text-muted-foreground">/100</span>
            </div>
        </div>
    )
}

function ScoreTag({ score }) {
    if (score >= 75) return <span className="px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold">Future-Proof ✓</span>
    if (score >= 55) return <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">Moderately Safe</span>
    return <span className="px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold">At Risk</span>
}
