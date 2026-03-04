import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, ExternalLink, GraduationCap, Filter, Star } from 'lucide-react'

const COLLEGES = [
    // Featured
    { name: "GES's R.H. Sapat College of Engineering", stream: ['Engineering'], district: 'Nashik', type: 'Private', nirf: null, website: 'https://ges-coengg.org', course: 'BE, ME, MBA', fees: '₹1.0 LPA', desc: "Gokhale Education Society's R.H. Sapat College of Engineering, Management & Research — awards BE degree, affiliated to SPPU. Well-respected institute in Nashik with strong industry connections." },

    // Mumbai Region
    { name: 'IIT Bombay', stream: ['Engineering', 'Science'], district: 'Mumbai', type: 'IIT', nirf: 3, website: 'https://www.iitb.ac.in', course: 'B.Tech, M.Tech, PhD', fees: '₹2.2 LPA', desc: 'Premier engineering institution, India rank #3 (NIRF)' },
    { name: 'VJTI Mumbai', stream: ['Engineering'], district: 'Mumbai', type: 'Government', nirf: null, website: 'https://vjti.ac.in', course: 'B.Tech, M.Tech', fees: '₹1.2 LPA', desc: 'One of the oldest and most reputed technical institutes in Maharashtra' },
    { name: 'UDCT (ICT Mumbai)', stream: ['Engineering', 'Science'], district: 'Mumbai', type: 'Government', nirf: 34, website: 'https://ictmumbai.edu.in', course: 'B.Tech (Chemical), M.Tech, PhD', fees: '₹1 LPA', desc: 'Top institute for chemical and technology programs in India' },
    { name: 'SPPU (Savitribai Phule Pune University)', stream: ['Engineering', 'Science', 'Commerce', 'Arts'], district: 'Pune', type: 'University', nirf: null, website: 'https://www.unipune.ac.in', course: 'Various UG/PG programs', fees: '₹15k-80k', desc: 'Largest university in Maharashtra with 800+ affiliated colleges' },
    { name: 'Grant Medical College & Sir JJ Hospital', stream: ['Medical'], district: 'Mumbai', type: 'Government', nirf: null, website: 'https://gmc.edu.in', course: 'MBBS, MD, MS', fees: '₹40k/year', desc: 'One of Asia\'s oldest medical colleges, established 1845' },
    { name: 'Seth GS Medical College & KEM Hospital', stream: ['Medical'], district: 'Mumbai', type: 'Government', nirf: null, website: 'http://www.kem.edu', course: 'MBBS, MD, MS, Super-Specialty', fees: '₹40k/year', desc: 'Premier medical college affiliated with Mumbai University' },
    { name: 'Sydenham College of Commerce', stream: ['Commerce', 'Arts'], district: 'Mumbai', type: 'Government', nirf: null, website: 'https://sydenham.ac.in', course: 'B.Com, M.Com, MMS', fees: '₹20k/year', desc: 'Top commerce college in India, established 1913' },
    { name: 'NM College of Commerce', stream: ['Commerce', 'Science'], district: 'Mumbai', type: 'Autonomous', nirf: null, website: 'https://nmcollege.in', course: 'B.Com, B.Sc, BMS', fees: '₹30k/year', desc: 'Narsee Monjee College — one of Mumbai\'s best commerce colleges' },
    { name: 'Wilson College Mumbai', stream: ['Science', 'Arts', 'Commerce'], district: 'Mumbai', type: 'Autonomous', nirf: null, website: 'https://wilsoncollege.edu', course: 'B.Sc, B.A, B.Com', fees: '₹25k/year', desc: 'Heritage college known for science programs and cultural events' },

    // Pune Region
    { name: 'COEP Technological University', stream: ['Engineering'], district: 'Pune', type: 'Government', nirf: 73, website: 'https://www.coep.org.in', course: 'B.Tech, M.Tech', fees: '₹1.3 LPA', desc: 'College of Engineering Pune — autonomous university since 2004' },
    { name: 'MIT College of Engineering Pune', stream: ['Engineering'], district: 'Pune', type: 'Private', nirf: null, website: 'https://mitcoe.edu.in', course: 'B.Tech, M.Tech, MBA', fees: '₹1.8 LPA', desc: 'Maharashtra Institute of Technology — excellent placements in IT' },
    { name: 'Symbiosis Institute of Technology', stream: ['Engineering'], district: 'Pune', type: 'Deemed', nirf: null, website: 'https://www.sitpune.edu.in', course: 'B.Tech, M.Tech', fees: '₹2.5 LPA', desc: 'Part of Symbiosis International University, global collaborations' },
    { name: 'Symbiosis College of Arts & Commerce', stream: ['Commerce', 'Arts'], district: 'Pune', type: 'Autonomous', nirf: null, website: 'https://symbiosisc.ac.in', course: 'B.A, B.Com, M.A', fees: '₹50k/year', desc: 'Top-ranked arts and commerce college in Pune under SIU' },
    { name: 'BJ Medical College Pune', stream: ['Medical'], district: 'Pune', type: 'Government', nirf: null, website: 'https://bjmcpune.org', course: 'MBBS, MD, MS', fees: '₹40k/year', desc: 'Top government medical college attached to Sassoon General Hospital' },
    { name: 'PUMBA (MBA Dept, SPPU)', stream: ['Commerce'], district: 'Pune', type: 'Government', nirf: null, website: 'https://pumba.unipune.ac.in', course: 'MBA, MMS', fees: '₹80k/year', desc: 'One of the best government MBA colleges in Maharashtra' },
    { name: 'Fergusson College Pune', stream: ['Science', 'Arts', 'Commerce'], district: 'Pune', type: 'Autonomous', nirf: null, website: 'https://fergusson.edu', course: 'B.Sc, B.A, B.Com, M.Sc', fees: '₹15k/year', desc: 'Historic autonomous college known for science and humanities' },
    { name: 'SP College Pune', stream: ['Science', 'Arts', 'Commerce'], district: 'Pune', type: 'Autonomous', nirf: null, website: 'http://spcollegepune.ac.in', course: 'B.Sc, B.A, B.Com', fees: '₹18k/year', desc: 'Sir Parashurambhau College — 120 years of academic excellence' },
    { name: 'Vishwakarma Institute of Technology', stream: ['Engineering'], district: 'Pune', type: 'Autonomous', nirf: null, website: 'https://vit.edu', course: 'B.Tech, M.Tech', fees: '₹1.5 LPA', desc: 'Top private engineering institute in Pune with strong placements' },

    // Nagpur Region
    { name: 'VNIT Nagpur', stream: ['Engineering', 'Science'], district: 'Nagpur', type: 'NIT', nirf: 37, website: 'https://vnit.ac.in', course: 'B.Tech, M.Tech, PhD', fees: '₹1.4 LPA', desc: 'Visvesvaraya National Institute of Technology — top NIT in Vidarbha' },
    { name: 'Govt. Medical College Nagpur', stream: ['Medical'], district: 'Nagpur', type: 'Government', nirf: null, website: 'https://gmcnagpur.edu.in', course: 'MBBS, MD, MS', fees: '₹40k/year', desc: 'Premier government medical institution in Vidarbha region' },
    { name: 'RTM Nagpur University', stream: ['Engineering', 'Science', 'Commerce', 'Arts'], district: 'Nagpur', type: 'University', nirf: null, website: 'https://nagpuruniversity.ac.in', course: 'Various UG/PG', fees: '₹15k-80k', desc: 'Rashtrasant Tukadoji Maharaj Nagpur University — Vidarbha\'s central university' },
    { name: 'YCCE Nagpur', stream: ['Engineering'], district: 'Nagpur', type: 'Autonomous', nirf: null, website: 'https://ycce.edu', course: 'B.Tech, M.Tech', fees: '₹1.2 LPA', desc: 'Yeshwantrao Chavan College of Engineering — top private engg college in Nagpur' },

    // Nashik Region
    { name: 'KK Wagh Engineering College', stream: ['Engineering'], district: 'Nashik', type: 'Private', nirf: null, website: 'https://kkwagh.edu.in', course: 'B.Tech, M.Tech', fees: '₹1.1 LPA', desc: 'Well-established engineering college in Nashik with good IT and mechanical placements.' },
    { name: "NDMVP's KBT College of Engineering", stream: ['Engineering'], district: 'Nashik', type: 'Autonomous', nirf: null, website: 'https://kbtcoe.org', course: 'B.Tech, M.Tech', fees: '₹1.0 LPA', desc: 'Top autonomous engineering college in Nashik — strong in Computer Science and Mechanical.' },
    { name: 'Sandip Institute of Technology (SITRC)', stream: ['Engineering'], district: 'Nashik', type: 'Private', nirf: null, website: 'https://www.sandipinstitutions.ac.in', course: 'B.Tech, M.Tech, MBA', fees: '₹1.2 LPA', desc: 'Part of Sandip University, Nashik — modern infrastructure and industry tie-ups.' },
    { name: 'Government College of Engineering Nashik', stream: ['Engineering', 'Science'], district: 'Nashik', type: 'Government', nirf: null, website: 'https://gcoeng.ac.in', course: 'B.Tech, M.Tech', fees: '₹80k/year', desc: 'Govt-run engineering college in Nashik with affordable fees and strong GATE results.' },
    { name: 'Late G.N. Sapkal College of Engineering', stream: ['Engineering'], district: 'Nashik', type: 'Private', nirf: null, website: 'https://sapkal.edu.in', course: 'B.Tech, M.Tech', fees: '₹1.0 LPA', desc: 'Sapkal Knowledge Hub Nashik — NBA-accredited, strong in CS and E&TC branches.' },
    { name: "MET's Institute of Engineering Nashik", stream: ['Engineering'], district: 'Nashik', type: 'Private', nirf: null, website: 'https://metbkc.org', course: 'B.Tech, M.Tech', fees: '₹1.1 LPA', desc: "Maharashtra Education Trust's engineering college — good civil, mechanical and IT branches." },
    { name: 'Amrutvahini College of Engineering Sangamner', stream: ['Engineering'], district: 'Nashik', type: 'Autonomous', nirf: null, website: 'https://amrutvahinicoe.edu.in', course: 'B.Tech, M.Tech', fees: '₹95k/year', desc: 'Autonomous engineering institute in Sangamner (Nashik dist) — known for research output.' },
    { name: 'KK Wagh Arts, Commerce & Science College', stream: ['Arts', 'Commerce', 'Science'], district: 'Nashik', type: 'Private', nirf: null, website: 'https://kkwagh.edu.in', course: 'B.A, B.Com, B.Sc, BCA', fees: '₹20k/year', desc: 'Multi-faculty college under KK Wagh Education Society — popular for B.Com and B.Sc.' },
    { name: 'HPT Arts & RYK Science College Nashik', stream: ['Arts', 'Science'], district: 'Nashik', type: 'Autonomous', nirf: null, website: 'https://hptcollege.ac.in', course: 'B.A, B.Sc, M.Sc, M.A', fees: '₹15k/year', desc: 'Prestigious autonomous college in Nashik — 100+ years of excellence in arts and sciences.' },
    { name: "SSVPS's BS Deore College of Commerce", stream: ['Commerce'], district: 'Nashik', type: 'Autonomous', nirf: null, website: 'https://ssvpsbsdeore.edu.in', course: 'B.Com, M.Com, BBA', fees: '₹18k/year', desc: 'Top commerce college for North Maharashtra — known for banking and finance programs.' },
    { name: 'Dr. Vasantrao Pawar Medical College Nashik', stream: ['Medical'], district: 'Nashik', type: 'Private', nirf: null, website: 'https://dvpmch.edu.in', course: 'MBBS, MD, MS', fees: '₹5 LPA', desc: 'Leading private medical college in Nashik — attached to 500-bed hospital, MUHS affiliated.' },
    { name: "NDMVP's College of Pharmacy Nashik", stream: ['Medical'], district: 'Nashik', type: 'Autonomous', nirf: null, website: 'https://ndmvp.org', course: 'B.Pharm, M.Pharm, D.Pharm', fees: '₹60k/year', desc: 'Top pharmacy college in Nashik — affiliated to Maharashtra University of Health Sciences.' },
    { name: 'YCM Open University (YCMOU) Nashik', stream: ['Arts', 'Commerce', 'Science', 'Engineering'], district: 'Nashik', type: 'Government', nirf: null, website: 'https://ycmou.ac.in', course: 'Various UG/PG (Distance)', fees: '₹5k-30k', desc: 'Yashwantrao Chavan Maharashtra Open University — Nashik-based hub for distance education.' },


    // Other Maharashtra

]

const STREAMS = ['All', 'Engineering', 'Medical', 'Commerce', 'Science', 'Arts']
const DISTRICTS = ['All', 'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Sangli', 'Kolhapur']
const TYPE_COLORS = {
    'IIT': 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    'NIT': 'bg-blue-500/15 border-blue-500/30 text-blue-400',
    'Government': 'bg-green-500/15 border-green-500/30 text-green-400',
    'Autonomous': 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
    'Deemed': 'bg-purple-500/15 border-purple-500/30 text-purple-400',
    'Private': 'bg-pink-500/15 border-pink-500/30 text-pink-400',
    'University': 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
}

export default function CollegeFinder() {
    const [search, setSearch] = useState('')
    const [stream, setStream] = useState('All')
    const [district, setDistrict] = useState('All')

    const filtered = COLLEGES.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase())
        const matchStream = stream === 'All' || c.stream.includes(stream)
        const matchDistrict = district === 'All' || c.district === district
        return matchSearch && matchStream && matchDistrict
    })

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-4">
                    <GraduationCap className="w-4 h-4" /> Maharashtra College Finder
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">Find Your <span className="text-gradient">Dream College</span></h1>
                <p className="text-muted-foreground">Explore {COLLEGES.length}+ top colleges across Maharashtra with official links</p>
            </motion.div>

            {/* Filters */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 mb-8 space-y-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search colleges by name or keyword..."
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 text-sm" />
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Stream:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {STREAMS.map(s => (
                            <button key={s} onClick={() => setStream(s)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${stream === s ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'}`}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">District:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {DISTRICTS.map(d => (
                            <button key={d} onClick={() => setDistrict(d)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${district === d ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'}`}>
                                {d}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-5">{filtered.length} college{filtered.length !== 1 ? 's' : ''} found</p>

            {/* College Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((college, i) => (
                    <motion.div key={college.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                        className="glass-card p-5 hover:border-white/20 transition-all group flex flex-col">
                        <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex-grow min-w-0">
                                <h3 className="font-bold text-sm leading-tight mb-1 group-hover:text-cyan-400 transition-colors">{college.name}</h3>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <MapPin className="w-3 h-3 flex-shrink-0" />{college.district}, Maharashtra
                                </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${TYPE_COLORS[college.type] || 'bg-white/5 border-white/10 text-white/50'}`}>
                                {college.type}
                            </span>
                        </div>

                        {college.nirf && (
                            <div className="flex items-center gap-1.5 mb-2">
                                <Star className="w-3 h-3 text-amber-400" />
                                <span className="text-xs text-amber-400 font-medium">NIRF Rank #{college.nirf}</span>
                            </div>
                        )}

                        <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-grow">{college.desc}</p>

                        <div className="space-y-1.5 mb-4">
                            <div className="flex flex-wrap gap-1.5">
                                {college.stream.map(s => (
                                    <span key={s} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-white/60">{s}</span>
                                ))}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                <span className="text-white/50">Courses: </span>{college.course}
                            </div>
                            <div className="text-xs">
                                <span className="text-white/50">Fees: </span>
                                <span className="text-green-400 font-medium">{college.fees}</span>
                            </div>
                        </div>

                        <a href={college.website} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-cyan-500/30 text-cyan-400 text-xs font-medium hover:bg-cyan-500/10 transition-all mt-auto">
                            <ExternalLink className="w-3.5 h-3.5" /> Visit Official Website
                        </a>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No colleges found for your filters. Try adjusting your search.</p>
                </div>
            )}
        </div>
    )
}
