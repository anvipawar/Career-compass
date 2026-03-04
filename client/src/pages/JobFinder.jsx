import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, ExternalLink, Briefcase, Clock, TrendingUp, Filter } from 'lucide-react'

const JOBS = [
    // Tech
    { title: 'Software Engineer (Frontend)', company: 'Infosys', location: 'Pune / Remote', salary: '₹4–8 LPA', exp: 'Fresher–2 yrs', skills: ['React.js', 'JavaScript', 'HTML/CSS'], category: 'Tech', type: 'Full-time', link: 'https://www.infosys.com/careers/', logo: '🏢' },
    { title: 'Data Analyst', company: 'TCS', location: 'Mumbai / Hyderabad', salary: '₹4–7 LPA', exp: 'Fresher–2 yrs', skills: ['Python', 'SQL', 'Excel', 'Tableau'], category: 'Tech', type: 'Full-time', link: 'https://www.tcs.com/careers', logo: '📊' },
    { title: 'Machine Learning Engineer', company: 'Flipkart', location: 'Bangalore', salary: '₹15–30 LPA', exp: '2–5 yrs', skills: ['Python', 'TensorFlow', 'Spark', 'SQL'], category: 'Tech', type: 'Full-time', link: 'https://www.flipkartcareers.com', logo: '🤖' },
    { title: 'Backend Developer (Node.js)', company: 'Razorpay', location: 'Bangalore / Remote', salary: '₹12–22 LPA', exp: '1–3 yrs', skills: ['Node.js', 'MongoDB', 'Redis', 'Docker'], category: 'Tech', type: 'Full-time', link: 'https://razorpay.com/jobs/', logo: '⚡' },
    { title: 'Cybersecurity Analyst', company: 'Wipro', location: 'Pune / Mumbai', salary: '₹5–12 LPA', exp: '0–3 yrs', skills: ['Network Security', 'SIEM', 'Linux', 'Python'], category: 'Tech', type: 'Full-time', link: 'https://www.wipro.com/careers/', logo: '🔐' },
    { title: 'Full Stack Intern', company: 'Swiggy', location: 'Bangalore / Remote', salary: '₹30–50k/month', exp: 'Fresher', skills: ['React', 'Node.js', 'MongoDB'], category: 'Tech', type: 'Internship', link: 'https://careers.swiggy.com', logo: '🍕' },
    { title: 'Cloud Engineer (AWS)', company: 'Accenture', location: 'Hyderabad / Pune', salary: '₹6–15 LPA', exp: '1–4 yrs', skills: ['AWS', 'Terraform', 'Docker', 'Linux'], category: 'Tech', type: 'Full-time', link: 'https://www.accenture.com/in-en/careers', logo: '☁️' },
    { title: 'Android Developer', company: 'Ola', location: 'Bangalore', salary: '₹10–20 LPA', exp: '1–3 yrs', skills: ['Kotlin', 'Java', 'Android SDK', 'Firebase'], category: 'Tech', type: 'Full-time', link: 'https://www.olacabs.com/careers', logo: '📱' },

    // Healthcare
    { title: 'Junior Resident Doctor', company: 'Apollo Hospitals', location: 'Mumbai / Chennai / Delhi', salary: '₹60–90k/month', exp: 'MBBS Pass', skills: ['Clinical Skills', 'Patient Care', 'Medical Ethics'], category: 'Healthcare', type: 'Full-time', link: 'https://www.apollohospitals.com/careers/', logo: '🏥' },
    { title: 'Pharmacist', company: 'Sun Pharmaceuticals', location: 'Mumbai / Ahmedabad', salary: '₹3–6 LPA', exp: 'Fresher–2 yrs', skills: ['Pharmacology', 'Drug Dispensing', 'Quality Control'], category: 'Healthcare', type: 'Full-time', link: 'https://www.sunpharma.com/about-us/careers', logo: '💊' },
    { title: 'Medical Lab Technician', company: 'Metropolis Labs', location: 'Pune / Mumbai', salary: '₹2.5–5 LPA', exp: 'Fresher–2 yrs', skills: ['Lab Analysis', 'DMLT', 'Pathology'], category: 'Healthcare', type: 'Full-time', link: 'https://www.metropolisindia.com', logo: '🔬' },
    { title: 'Biomedical Engineer', company: 'Siemens Healthineers', location: 'Gurgaon / Bangalore', salary: '₹5–12 LPA', exp: '1–3 yrs', skills: ['Medical Devices', 'Biomedical Engineering', 'CAD'], category: 'Healthcare', type: 'Full-time', link: 'https://www.siemens-healthineers.com/careers', logo: '⚕️' },

    // Finance
    { title: 'Investment Banking Analyst', company: 'HDFC Bank', location: 'Mumbai', salary: '₹6–14 LPA', exp: 'Fresher–2 yrs', skills: ['Financial Modeling', 'Excel', 'CFA/MBA', 'Valuation'], category: 'Finance', type: 'Full-time', link: 'https://www.hdfcbank.com/content/bbp/repositories/local/careers', logo: '🏦' },
    { title: 'CA Articleship', company: 'Deloitte India', location: 'Mumbai / Pune / Delhi', salary: '₹15–25k/month stipend', exp: 'CA Student', skills: ['Accounting', 'Audit', 'Tax', 'Tally'], category: 'Finance', type: 'Internship', link: 'https://www2.deloitte.com/in/en/careers', logo: '📈' },
    { title: 'Financial Analyst', company: 'Zerodha', location: 'Bangalore / Remote', salary: '₹5–12 LPA', exp: '1–3 yrs', skills: ['Financial Analysis', 'Python', 'Excel', 'Stock Markets'], category: 'Finance', type: 'Full-time', link: 'https://zerodha.com/careers/', logo: '📉' },

    // Design
    { title: 'UX Designer', company: 'Myntra', location: 'Bangalore', salary: '₹8–18 LPA', exp: '1–3 yrs', skills: ['Figma', 'User Research', 'Prototyping', 'Design Thinking'], category: 'Design', type: 'Full-time', link: 'https://www.myntra.com/careers', logo: '🎨' },
    { title: 'Graphic Design Intern', company: 'Zomato', location: 'Gurgaon / Remote', salary: '₹20–35k/month', exp: 'Fresher', skills: ['Illustrator', 'Photoshop', 'Figma', 'Motion Design'], category: 'Design', type: 'Internship', link: 'https://www.zomato.com/careers', logo: '✏️' },
    { title: 'Motion Graphics Designer', company: 'Hotstar', location: 'Mumbai / Bangalore', salary: '₹6–15 LPA', exp: '1–4 yrs', skills: ['After Effects', 'Cinema 4D', 'Premiere Pro'], category: 'Design', type: 'Full-time', link: 'https://www.hotstar.com/careers', logo: '🎬' },

    // Government
    { title: 'SSC CGL (Various Posts)', company: 'Staff Selection Commission', location: 'All India', salary: '₹5–9 LPA', exp: 'Graduate', skills: ['General Knowledge', 'Reasoning', 'Quantitative Aptitude'], category: 'Government', type: 'Government', link: 'https://ssc.gov.in', logo: '🏛️' },
    { title: 'IBPS PO (Banking)', company: 'IBPS', location: 'All India', salary: '₹5–8 LPA', exp: 'Graduate (21–30 yrs)', skills: ['Banking Awareness', 'English', 'Reasoning', 'Maths'], category: 'Government', type: 'Government', link: 'https://www.ibps.in', logo: '🏧' },
    { title: 'Railway NTPC', company: 'Indian Railways (RRB)', location: 'All India', salary: '₹3.5–6 LPA', exp: '12th Pass / Graduate', skills: ['GK', 'Maths', 'General Science', 'Reasoning'], category: 'Government', type: 'Government', link: 'https://www.rrbapply.gov.in', logo: '🚂' },
    { title: 'MPSC State Service', company: 'Maharashtra Public Service Commission', location: 'Maharashtra', salary: '₹6–12 LPA', exp: 'Graduate (21–38 yrs)', skills: ['Marathi', 'GK', 'Current Affairs', 'History'], category: 'Government', type: 'Government', link: 'https://www.mpsc.gov.in', logo: '⚖️' },
]

const CATEGORIES = ['All', 'Tech', 'Healthcare', 'Finance', 'Design', 'Government']
const CAT_COLORS = {
    Tech: 'from-cyan-500 to-blue-600', Healthcare: 'from-red-500 to-rose-600',
    Finance: 'from-green-500 to-emerald-600', Design: 'from-pink-500 to-fuchsia-600',
    Government: 'from-indigo-500 to-blue-700'
}

export default function JobFinder() {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')
    const [typeFilter, setTypeFilter] = useState('All')

    const filtered = JOBS.filter(j => {
        const s = search.toLowerCase()
        const matchSearch = j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s) || j.skills.some(sk => sk.toLowerCase().includes(s))
        const matchCat = category === 'All' || j.category === category
        const matchType = typeFilter === 'All' || j.type === typeFilter
        return matchSearch && matchCat && matchType
    })

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-medium mb-4">
                    <Briefcase className="w-4 h-4" /> India Job Finder
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">Find Your <span className="text-gradient">Dream Job</span></h1>
                <p className="text-muted-foreground">{JOBS.length}+ curated openings across Tech, Healthcare, Finance, Design & Government</p>
            </motion.div>

            {/* Filters */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 mb-8 space-y-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by role, company, or skill..."
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500/50 text-sm" />
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setCategory(c)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${category === c ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'}`}>
                                {c}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 ml-auto">
                        {['All', 'Full-time', 'Internship', 'Government'].map(t => (
                            <button key={t} onClick={() => setTypeFilter(t)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${typeFilter === t ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            <p className="text-sm text-muted-foreground mb-5">{filtered.length} job{filtered.length !== 1 ? 's' : ''} found</p>

            {/* Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((job, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                        className="glass-card p-5 hover:border-white/20 transition-all group flex flex-col">
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${CAT_COLORS[job.category] || 'from-gray-500 to-gray-600'} flex items-center justify-center text-xl flex-shrink-0`}>
                                {job.logo}
                            </div>
                            <div className="flex-grow min-w-0">
                                <h3 className="font-bold text-sm group-hover:text-cyan-400 transition-colors">{job.title}</h3>
                                <p className="text-sm text-muted-foreground">{job.company}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${job.type === 'Internship' ? 'bg-amber-500/15 border-amber-500/30 text-amber-400' : job.type === 'Government' ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400' : 'bg-green-500/15 border-green-500/30 text-green-400'}`}>
                                {job.type}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> {job.location}
                            </div>
                            <div className="flex items-center gap-1.5 text-green-400 font-medium">
                                <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" /> {job.salary}
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
                                <Clock className="w-3.5 h-3.5 flex-shrink-0" /> Experience: {job.exp}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {job.skills.map(skill => (
                                <span key={skill} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-white/60">{skill}</span>
                            ))}
                        </div>

                        <a href={job.link} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-purple-500/30 text-purple-400 text-xs font-medium hover:bg-purple-500/10 transition-all mt-auto">
                            <ExternalLink className="w-3.5 h-3.5" /> Apply Now
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
