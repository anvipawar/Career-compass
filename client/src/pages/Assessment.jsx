import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronRight, ChevronLeft, CheckCircle2, User, BookOpen,
    Star, Target, BrainCircuit, Sparkles, Zap, Award, TrendingUp
} from 'lucide-react'
import { analyzeCareer } from '../services/careerAI'

// ─── Data ──────────────────────────────────────────────────────────
const STREAMS = ['Science (PCM)', 'Science (PCB)', 'Science (PCMB)', 'Commerce', 'Arts/Humanities', 'Vocational']

const SUBJECTS_BY_STREAM = {
    'Science (PCM)': ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English'],
    'Science (PCB)': ['Biology', 'Physics', 'Chemistry', 'Psychology', 'English'],
    'Science (PCMB)': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
    'Commerce': ['Accountancy', 'Economics', 'Business Studies', 'Mathematics', 'Entrepreneurship'],
    'Arts/Humanities': ['History', 'Geography', 'Political Science', 'Psychology', 'Sociology', 'English Literature'],
    'Vocational': ['IT', 'Electronics', 'Agriculture', 'Healthcare', 'Tourism'],
}

const ALL_SOFT_SKILLS = [
    'Communication', 'Leadership', 'Problem Solving', 'Creativity', 'Teamwork',
    'Time Management', 'Critical Thinking', 'Adaptability', 'Empathy', 'Attention to Detail',
    'Public Speaking', 'Research Skills'
]

const ALL_CAREER_INTERESTS = [
    'Technology & Software', 'Artificial Intelligence', 'Data Science', 'Medicine & Healthcare',
    'Finance & Banking', 'Law & Justice', 'Design & Arts', 'Teaching & Education',
    'Business & Entrepreneurship', 'Government & Civil Services', 'Media & Journalism',
    'Engineering & Manufacturing', 'Environment & Sustainability', 'Space & Research',
    'Social Work & NGO', 'Sports & Fitness', 'Gaming & Animation', 'E-commerce & Marketing'
]

const TOTAL_STEPS = 4

const stepConfig = [
    { icon: <User className="w-5 h-5" />, title: 'Personal Info', color: 'text-cyan-400' },
    { icon: <BookOpen className="w-5 h-5" />, title: 'Academic Profile', color: 'text-purple-400' },
    { icon: <Star className="w-5 h-5" />, title: 'Skills & Strengths', color: 'text-amber-400' },
    { icon: <Target className="w-5 h-5" />, title: 'Career Interests', color: 'text-green-400' },
]

// ─── Component ─────────────────────────────────────────────────────
export default function Assessment() {
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        stream: '',
        favouriteSubject: '',
        percentage: '',
        strongSubjects: [],
        softSkills: [],
        careerInterests: [],
    })
    const navigate = useNavigate()

    const availableSubjects = formData.stream ? SUBJECTS_BY_STREAM[formData.stream] || [] : []

    const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

    const toggleArrayItem = (field, item) => {
        setFormData(prev => {
            const exists = prev[field].includes(item)
            return { ...prev, [field]: exists ? prev[field].filter(i => i !== item) : [...prev[field], item] }
        })
    }

    const canProceed = () => {
        switch (step) {
            case 1: return formData.name.trim().length >= 2
            case 2: return formData.stream && formData.favouriteSubject && formData.percentage
            case 3: return formData.strongSubjects.length >= 1 && formData.softSkills.length >= 1
            case 4: return formData.careerInterests.length >= 1
            default: return false
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        setError('')
        try {
            const result = await analyzeCareer(formData)
            navigate('/results', { state: { analysis: result.data, formData } })
        } catch (err) {
            setError(err?.response?.data?.message || 'AI analysis failed. Please try again.')
            setIsLoading(false)
        }
    }

    const nextStep = () => {
        if (!canProceed()) return
        if (step < TOTAL_STEPS) setStep(s => s + 1)
        else handleSubmit()
    }

    if (isLoading) return <LoadingScreen name={formData.name} />

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Ambient blobs */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-3xl mx-auto px-6 py-12">
                {/* ── Header ── */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>Powered by Gemini AI</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        Career <span className="text-gradient">AI Assessment</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Answer 4 quick steps — get a complete professional career analysis in seconds.
                    </p>
                </motion.div>

                {/* ── Step Indicator ── */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    {stepConfig.map((s, i) => {
                        const num = i + 1
                        const isActive = step === num
                        const isDone = step > num
                        return (
                            <React.Fragment key={num}>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-white/10 border border-white/20' : 'opacity-40'}`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isDone ? 'bg-green-500 text-white' : isActive ? 'bg-gradient-to-br from-cyan-400 to-purple-500 text-white' : 'bg-white/10 text-white/50'}`}>
                                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : num}
                                    </div>
                                    <span className={`text-xs font-medium hidden sm:block ${isActive ? s.color : ''}`}>{s.title}</span>
                                </div>
                                {i < stepConfig.length - 1 && (
                                    <div className={`h-px w-6 transition-all ${step > num ? 'bg-green-500' : 'bg-white/10'}`} />
                                )}
                            </React.Fragment>
                        )
                    })}
                </div>

                {/* ── Progress Bar ── */}
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-10">
                    <motion.div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                        animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                        transition={{ type: 'spring', stiffness: 80 }} />
                </div>

                {/* ── Form Steps ── */}
                <AnimatePresence mode="wait">
                    <motion.div key={step}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}>

                        {/* STEP 1 - Personal Info */}
                        {step === 1 && (
                            <div className="glass-card p-8 space-y-6">
                                <StepHeader icon={<User className="w-6 h-6 text-cyan-400" />} title="Tell us about yourself" sub="This helps AI personalize your analysis." />
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Your Full Name *</label>
                                    <input value={formData.name}
                                        onChange={e => updateField('name', e.target.value)}
                                        placeholder="e.g. Tanvi Shende"
                                        className="input-field text-lg"
                                    />
                                </div>
                                <div className="bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-white/5 rounded-xl p-4">
                                    <p className="text-sm text-muted-foreground">🤖 Our Gemini AI will analyze your profile and generate a <span className="text-white font-medium">personalized career roadmap</span>, skill gap analysis, and future-proof score — all in under 30 seconds.</p>
                                </div>
                            </div>
                        )}

                        {/* STEP 2 - Academic Profile */}
                        {step === 2 && (
                            <div className="glass-card p-8 space-y-6">
                                <StepHeader icon={<BookOpen className="w-6 h-6 text-purple-400" />} title="Academic Profile" sub="Your stream and performance shape career recommendations." />

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-muted-foreground">12th Stream *</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {STREAMS.map(stream => (
                                            <button key={stream} onClick={() => { updateField('stream', stream); updateField('favouriteSubject', ''); updateField('strongSubjects', []) }}
                                                className={`p-3 rounded-xl border text-sm font-medium text-left transition-all ${formData.stream === stream ? 'bg-purple-500/15 border-purple-500/50 text-purple-300' : 'bg-white/3 border-white/8 text-muted-foreground hover:border-white/15 hover:bg-white/5'}`}>
                                                {stream}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {formData.stream && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                        <label className="block text-sm font-medium mb-2 text-muted-foreground">Favourite Subject *</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {availableSubjects.map(sub => (
                                                <button key={sub} onClick={() => updateField('favouriteSubject', sub)}
                                                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.favouriteSubject === sub ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300' : 'bg-white/3 border-white/8 text-muted-foreground hover:border-white/15'}`}>
                                                    {sub}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-muted-foreground">12th Percentage / Board Rank *</label>
                                    <input value={formData.percentage}
                                        onChange={e => updateField('percentage', e.target.value)}
                                        placeholder="e.g. 87% or AIR 1200"
                                        className="input-field"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1.5">Enter your percentage (e.g. 87%) or rank if applicable (e.g. JEE AIR 1200)</p>
                                </div>
                            </div>
                        )}

                        {/* STEP 3 - Skills */}
                        {step === 3 && (
                            <div className="glass-card p-8 space-y-6">
                                <StepHeader icon={<Star className="w-6 h-6 text-amber-400" />} title="Your Skills & Strengths" sub="Select what applies to you — the more you pick, the better the AI analysis." />

                                {formData.stream && availableSubjects.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-medium mb-3 text-muted-foreground">Strong Subjects * <span className="text-xs">(pick at least 1)</span></label>
                                        <div className="flex flex-wrap gap-2">
                                            {availableSubjects.map(sub => (
                                                <TagButton key={sub} label={sub} active={formData.strongSubjects.includes(sub)}
                                                    onClick={() => toggleArrayItem('strongSubjects', sub)} activeClass="bg-amber-500/15 border-amber-500/50 text-amber-300" />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-3 text-muted-foreground">Soft Skills * <span className="text-xs">(pick at least 1)</span></label>
                                    <div className="flex flex-wrap gap-2">
                                        {ALL_SOFT_SKILLS.map(skill => (
                                            <TagButton key={skill} label={skill} active={formData.softSkills.includes(skill)}
                                                onClick={() => toggleArrayItem('softSkills', skill)} activeClass="bg-green-500/15 border-green-500/50 text-green-300" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 4 - Career Interests */}
                        {step === 4 && (
                            <div className="glass-card p-8 space-y-6">
                                <StepHeader icon={<Target className="w-6 h-6 text-green-400" />} title="Career Interests" sub="Select domains that excite you. Pick as many as you like!" />
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {ALL_CAREER_INTERESTS.map(interest => (
                                        <button key={interest} onClick={() => toggleArrayItem('careerInterests', interest)}
                                            className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${formData.careerInterests.includes(interest) ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'bg-white/3 border-white/8 text-muted-foreground hover:border-white/15 hover:bg-white/5'}`}>
                                            {interest}
                                        </button>
                                    ))}
                                </div>

                                {/* Summary before submit */}
                                <div className="bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 rounded-xl p-5 space-y-2">
                                    <h4 className="font-semibold text-sm text-cyan-300 flex items-center gap-2"><Award className="w-4 h-4" />Profile Preview</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <InfoRow label="Name" value={formData.name} />
                                        <InfoRow label="Stream" value={formData.stream} />
                                        <InfoRow label="Favourite" value={formData.favouriteSubject} />
                                        <InfoRow label="Score" value={formData.percentage} />
                                        <InfoRow label="Strong Subjects" value={`${formData.strongSubjects.length} selected`} />
                                        <InfoRow label="Soft Skills" value={`${formData.softSkills.length} selected`} />
                                        <InfoRow label="Interests" value={`${formData.careerInterests.length} selected`} />
                                    </div>
                                </div>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>

                {/* Error */}
                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                        ⚠️ {error}
                    </motion.div>
                )}

                {/* ── Navigation ── */}
                <div className="mt-8 flex items-center justify-between">
                    <button onClick={() => setStep(s => s - 1)}
                        className={`flex items-center gap-2 text-muted-foreground hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5 ${step === 1 ? 'invisible' : ''}`}>
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>

                    <button onClick={nextStep} disabled={!canProceed()}
                        className="btn-primary flex items-center gap-2 min-w-[160px] justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100">
                        {step === TOTAL_STEPS ? (
                            <><Zap className="w-4 h-4" /> Analyse My Career</>
                        ) : (
                            <>Continue <ChevronRight className="w-4 h-4" /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Sub-components ─────────────────────────────────────────────────
function StepHeader({ icon, title, sub }) {
    return (
        <div className="flex items-start gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex-shrink-0">{icon}</div>
            <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-muted-foreground text-sm mt-0.5">{sub}</p>
            </div>
        </div>
    )
}

function TagButton({ label, active, onClick, activeClass }) {
    return (
        <button onClick={onClick}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${active ? `${activeClass} shadow-sm` : 'bg-white/3 border-white/8 text-muted-foreground hover:border-white/15 hover:bg-white/5'}`}>
            {active && <span className="mr-1">✓</span>}{label}
        </button>
    )
}

function InfoRow({ label, value }) {
    return (
        <div className="flex gap-1 text-xs">
            <span className="text-muted-foreground">{label}:</span>
            <span className="text-white font-medium truncate">{value || '—'}</span>
        </div>
    )
}

// ─── Loading Screen ─────────────────────────────────────────────────
function LoadingScreen({ name }) {
    const steps = [
        'Parsing your academic profile...',
        'Analysing market trends in India...',
        'Matching skills with career paths...',
        'Building your 6-month roadmap...',
        'Calculating future-proof score...',
        'Almost ready — polishing your report...',
    ]
    const [stepIdx, setStepIdx] = useState(0)

    React.useEffect(() => {
        const iv = setInterval(() => setStepIdx(i => (i + 1) % steps.length), 2500)
        return () => clearInterval(iv)
    }, [])

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
            {/* Spinner */}
            <div className="relative w-28 h-28 mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
                <div className="absolute inset-2 rounded-full border-4 border-purple-500/20" />
                <div className="absolute inset-2 rounded-full border-4 border-t-cyan-400 border-r-purple-500 border-b-transparent border-l-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <BrainCircuit className="w-10 h-10 text-cyan-400 animate-pulse" />
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-3 text-center">
                Analysing <span className="text-gradient">{name || 'Your'}</span>'s Profile
            </h2>
            <AnimatePresence mode="wait">
                <motion.p key={stepIdx}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="text-muted-foreground text-center max-w-sm">
                    {steps[stepIdx]}
                </motion.p>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex gap-2 mt-8">
                {steps.map((_, i) => (
                    <motion.div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= stepIdx ? 'bg-cyan-400 w-6' : 'bg-white/10 w-2'}`} />
                ))}
            </div>

            <p className="text-xs text-muted-foreground mt-6 text-center">
                🔒 Your data is processed securely and not stored
            </p>
        </div>
    )
}
