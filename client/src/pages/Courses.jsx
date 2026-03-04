import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, Clock, Star, Search, Zap } from 'lucide-react'

const COURSES = [
    // Coding
    { title: 'Python for Everybody', provider: 'Coursera (University of Michigan)', level: 'Beginner', duration: '7 weeks', free: true, rating: 4.8, category: 'Coding', link: 'https://www.coursera.org/specializations/python', desc: 'Learn Python from scratch — variables, loops, functions, and web scraping.' },
    { title: 'The Web Developer Bootcamp', provider: 'Udemy', level: 'Beginner', duration: '60 hrs', free: false, rating: 4.7, category: 'Coding', link: 'https://www.udemy.com/course/the-web-developer-bootcamp/', desc: 'Full stack web dev with HTML, CSS, JS, Node.js, MongoDB. Best beginner course.' },
    { title: 'CS50: Introduction to Computer Science', provider: 'Harvard / edX', level: 'Beginner', duration: '12 weeks', free: true, rating: 4.9, category: 'Coding', link: 'https://cs50.harvard.edu/x/', desc: 'The world\'s most popular intro to CS — C, Python, SQL, web development.' },
    { title: 'Data Structures and Algorithms', provider: 'GeeksforGeeks / LeetCode', level: 'Intermediate', duration: '4–6 months', free: true, rating: 4.7, category: 'Coding', link: 'https://www.geeksforgeeks.org/data-structures/', desc: 'Essential DSA — arrays, trees, graphs, dynamic programming for placements.' },
    { title: 'Java Programming Masterclass', provider: 'Udemy (Tim Buchalka)', level: 'Beginner–Intermediate', duration: '80 hrs', free: false, rating: 4.6, category: 'Coding', link: 'https://www.udemy.com/course/java-the-complete-java-developer-course/', desc: 'Most comprehensive Java course — OOP, collections, lambdas, Spring boot.' },
    { title: 'C Programming and Data Structures (NPTEL)', provider: 'NPTEL (IIT Kharagpur)', level: 'Beginner', duration: '12 weeks', free: true, rating: 4.5, category: 'Coding', link: 'https://nptel.ac.in/courses/106105085', desc: 'IIT-level C programming — free NPTEL certificate course with assignments.' },
    { title: 'Machine Learning Specialization', provider: 'Coursera (Andrew Ng)', level: 'Intermediate', duration: '3 months', free: false, rating: 4.9, category: 'Coding', link: 'https://www.coursera.org/specializations/machine-learning-introduction', desc: 'The most popular ML course — regression, neural networks, decision trees.' },
    { title: 'freeCodeCamp Full Stack', provider: 'freeCodeCamp.org', level: 'Beginner', duration: 'Self-paced', free: true, rating: 4.7, category: 'Coding', link: 'https://www.freecodecamp.org', desc: '300 hours of HTML/CSS/JS/React/Node — 6 certifications, completely free.' },

    // First Year Subjects
    { title: 'Engineering Mathematics (NPTEL)', provider: 'NPTEL (IIT Kharagpur)', level: 'Beginner', duration: '12 weeks', free: true, rating: 4.5, category: 'First Year', link: 'https://nptel.ac.in/courses/111105122', desc: 'Covers Calculus, Linear Algebra, Differential Equations for all engineering streams.' },
    { title: 'Engineering Physics (NPTEL)', provider: 'NPTEL (IIT Madras)', level: 'Beginner', duration: '12 weeks', free: true, rating: 4.4, category: 'First Year', link: 'https://nptel.ac.in/courses/115106090', desc: 'Optics, Quantum Mechanics, Semiconductors — first year engineering physics.' },
    { title: 'Engineering Chemistry', provider: 'NPTEL (IIT Bombay)', level: 'Beginner', duration: '12 weeks', free: true, rating: 4.3, category: 'First Year', link: 'https://nptel.ac.in/courses/104101001', desc: 'Thermodynamics, Polymers, Corrosion for first year engineering students.' },
    { title: 'Basic Electrical Engineering', provider: 'NPTEL (IIT Delhi)', level: 'Beginner', duration: '8 weeks', free: true, rating: 4.4, category: 'First Year', link: 'https://nptel.ac.in/courses/108105018', desc: 'DC/AC circuits, transformers, motors — essential BE/B.Tech first year.' },
    { title: 'Communication Skills in English', provider: 'Coursera (Georgia Tech)', level: 'Beginner', duration: '6 weeks', free: true, rating: 4.5, category: 'First Year', link: 'https://www.coursera.org/learn/improve-english', desc: 'Technical writing, presentations, emails — crucial for engineering students.' },
    { title: 'Engineering Drawing & Graphics', provider: 'NPTEL (IIT Roorkee)', level: 'Beginner', duration: '8 weeks', free: true, rating: 4.3, category: 'First Year', link: 'https://nptel.ac.in/courses/112107082', desc: 'Orthographic projections, CAD basics — mandatory for all engineering fields.' },

    // Medical / Healthcare
    { title: 'NEET Preparation (Physics Wallah)', provider: 'Physics Wallah (YouTube Free)', level: 'Beginner–Advanced', duration: '1 year', free: true, rating: 4.8, category: 'Medical', link: 'https://www.youtube.com/@PhysicsWallah', desc: 'Best free NEET prep on YouTube — Biology/Chemistry/Physics by top educators.' },
    { title: 'Human Anatomy & Physiology', provider: 'Coursera (Duke University)', level: 'Beginner', duration: '6 weeks', free: true, rating: 4.6, category: 'Medical', link: 'https://www.coursera.org/learn/anatomy', desc: 'Learn how the human body works — cells, tissues, organs, systems.' },
    { title: 'Introduction to Medical Terminology', provider: 'Coursera / eDX', level: 'Beginner', duration: '4 weeks', free: true, rating: 4.5, category: 'Medical', link: 'https://www.coursera.org/learn/medical-terminology', desc: 'Medical terms and abbreviations — essential for MBBS, BDS, Paramedical students.' },
    { title: 'Biochemistry and Molecular Biology', provider: 'NPTEL (IIT Madras)', level: 'Intermediate', duration: '12 weeks', free: true, rating: 4.4, category: 'Medical', link: 'https://nptel.ac.in/courses/102106060', desc: 'Proteins, enzymes, metabolism — core first/second year MBBS subject.' },
    { title: 'Pharmacology Basics', provider: 'Coursera (University of California)', level: 'Intermediate', duration: '5 weeks', free: false, rating: 4.5, category: 'Medical', link: 'https://www.coursera.org/learn/drug-development', desc: 'Drug development, pharmacokinetics, pharmacodynamics for medical students.' },

    // Commerce / Finance
    { title: 'CA Foundation Course', provider: 'ICAI Study Material (Free)', level: 'Beginner', duration: '4 months', free: true, rating: 4.6, category: 'Commerce', link: 'https://www.icai.org/post/study-material-for-foundation', desc: 'Official ICAI study material — Accounts, Law, Maths/Stats, Economics.' },
    { title: 'Tally ERP 9 & TallyPrime', provider: 'Udemy / YouTube', level: 'Beginner', duration: '20 hrs', free: false, rating: 4.5, category: 'Commerce', link: 'https://www.udemy.com/course/tally-erp-9/', desc: 'GST, accounting, payroll — must-know software for commerce & finance jobs.' },
    { title: 'Financial Accounting (B.Com)', provider: 'NPTEL', level: 'Beginner', duration: '12 weeks', free: true, rating: 4.4, category: 'Commerce', link: 'https://nptel.ac.in/courses/110105041', desc: 'Journal entries, ledgers, trial balance, final accounts — core B.Com subject.' },
    { title: 'GST Complete Course', provider: 'Udemy (CA/Tax Experts)', level: 'Beginner', duration: '15 hrs', free: false, rating: 4.6, category: 'Commerce', link: 'https://www.udemy.com/course/gst-comprehensive-course/', desc: 'GST registration, filing, types, ITC — essential for all commerce students.' },
    { title: 'Digital Marketing Fundamentals', provider: 'Google (Skillshop)', level: 'Beginner', duration: '40 hrs', free: true, rating: 4.7, category: 'Commerce', link: 'https://skillshop.withgoogle.com', desc: 'SEO, SEM, Google Ads, Analytics — free Google certificate, great for marketing.' },

    // Competitive Exams
    { title: 'SSC CGL Complete Prep', provider: 'Adda247 / Testbook', level: 'Beginner–Intermediate', duration: '6 months', free: false, rating: 4.5, category: 'Competitive', link: 'https://www.adda247.com', desc: 'Quantitative Aptitude, Reasoning, English, GK — complete SSC CGL preparation.' },
    { title: 'UPSC CSE Foundation Course', provider: 'Drishti IAS / Unacademy', level: 'Advanced', duration: '1–2 years', free: false, rating: 4.7, category: 'Competitive', link: 'https://www.drishtiias.com', desc: 'GS Papers 1–4, Essay, Optional Subject — India\'s most comprehensive UPSC prep.' },
    { title: 'IBPS PO & Clerk Prep', provider: 'Testbook (Free Tests)', level: 'Intermediate', duration: '4–6 months', free: true, rating: 4.5, category: 'Competitive', link: 'https://testbook.com', desc: 'Banking awareness, vocab, reasoning, maths — mock tests and previous papers.' },
]

const TABS = ['All', 'Coding', 'First Year', 'Medical', 'Commerce', 'Competitive']
const TAB_ICONS = { All: '📚', Coding: '💻', 'First Year': '🎓', Medical: '⚕️', Commerce: '💰', Competitive: '🏆' }

export default function Courses() {
    const [activeTab, setActiveTab] = useState('All')
    const [search, setSearch] = useState('')

    const filtered = COURSES.filter(c => {
        const matchTab = activeTab === 'All' || c.category === activeTab
        const s = search.toLowerCase()
        const matchSearch = c.title.toLowerCase().includes(s) || c.provider.toLowerCase().includes(s) || c.desc.toLowerCase().includes(s)
        return matchTab && matchSearch
    })

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-medium mb-4">
                    <Zap className="w-4 h-4" /> Course Library
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">Learn <span className="text-gradient">Anything</span></h1>
                <p className="text-muted-foreground">{COURSES.length}+ curated courses — Coding, Medical, Commerce, Competitive Exams & more</p>
            </motion.div>

            {/* Search */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses by title, provider..."
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-amber-500/50 text-sm" />
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap mb-8">
                {TABS.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${activeTab === tab ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'}`}>
                        <span>{TAB_ICONS[tab]}</span> {tab}
                    </button>
                ))}
            </div>

            <p className="text-sm text-muted-foreground mb-5">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</p>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((course, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                        className="glass-card p-5 hover:border-white/20 transition-all flex flex-col group">
                        <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex-grow min-w-0">
                                <h3 className="font-bold text-sm leading-tight mb-1 group-hover:text-amber-400 transition-colors">{course.title}</h3>
                                <p className="text-xs text-muted-foreground">{course.provider}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0 border ${course.free ? 'bg-green-500/15 border-green-500/30 text-green-400' : 'bg-amber-500/15 border-amber-500/30 text-amber-400'}`}>
                                {course.free ? 'FREE' : 'PAID'}
                            </span>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-grow">{course.desc}</p>

                        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-3 h-3" />{course.duration}
                            </div>
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star className="w-3 h-3 fill-amber-400" />{course.rating}
                            </div>
                            <div className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-muted-foreground" />
                                <span className={`${course.level === 'Beginner' ? 'text-green-400' : course.level === 'Advanced' ? 'text-red-400' : 'text-blue-400'}`}>
                                    {course.level.split('–')[0]}
                                </span>
                            </div>
                        </div>

                        <a href={course.link} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-amber-500/30 text-amber-400 text-xs font-medium hover:bg-amber-500/10 transition-all mt-auto">
                            <ExternalLink className="w-3.5 h-3.5" /> {course.free ? 'Start Free' : 'View Course'}
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
