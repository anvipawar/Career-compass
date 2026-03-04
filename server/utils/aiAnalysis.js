// Primary: Gemini REST API — Fallback: Smart algorithmic analysis
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function analyzeCareerWithAI(userData) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  // Try Gemini AI first
  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const result = await callGeminiAPI(userData, apiKey);
      return { ...result, _source: 'gemini' };
    } catch (err) {
      console.error('[Gemini API Error]', err.message);
      // Fall through to smart fallback
    }
  }

  // Smart algorithmic fallback — always produces personalized results
  console.log('[AI Fallback] Generating smart analysis for:', userData.name);
  return buildSmartAnalysis(userData);
}

async function callGeminiAPI(userData, apiKey) {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(userData) }] }],
      generationConfig: { temperature: 0.9, topK: 40, topP: 0.95, maxOutputTokens: 4096 }
    })
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Gemini ${response.status}: ${errBody}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty Gemini response');

  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = jsonMatch ? jsonMatch[1].trim() : text.trim();
  try {
    return JSON.parse(jsonStr);
  } catch {
    const obj = jsonStr.match(/\{[\s\S]*\}/);
    if (obj) return JSON.parse(obj[0]);
    throw new Error('Could not parse Gemini JSON');
  }
}

// ─── Smart algorithmic career analysis (India-focused) ───────────────────────
function buildSmartAnalysis(userData) {
  const { name, stream, favouriteSubject, percentage, strongSubjects, softSkills, careerInterests } = userData;
  const score = parseFloat(percentage) || 75;
  const interests = Array.isArray(careerInterests) ? careerInterests : [];
  const skills = Array.isArray(softSkills) ? softSkills : [];
  const strong = Array.isArray(strongSubjects) ? strongSubjects : [];

  // ── Career database (India-focused, dynamic matching) ──
  const CAREER_POOL = [
    {
      id: 'ai-ml', title: 'AI / Machine Learning Engineer',
      tags: ['Artificial Intelligence', 'Technology & Software', 'Data Science'],
      streams: ['Science (PCM)', 'Science (PCMB)'],
      subjects: ['Mathematics', 'Computer Science', 'Physics'],
      gradient: 'from-cyan-500 to-blue-600',
      salary: '8–28 LPA', demand: 'Very High', risk: 'Low',
      skills: ['Python', 'TensorFlow/PyTorch', 'Linear Algebra', 'SQL', 'Cloud ML'],
      colleges: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'BITS Pilani', 'NIT Trichy'],
    },
    {
      id: 'fullstack', title: 'Full Stack Developer',
      tags: ['Technology & Software', 'E-commerce & Marketing', 'Gaming & Animation'],
      streams: ['Science (PCM)', 'Science (PCMB)', 'Vocational'],
      subjects: ['Computer Science', 'Mathematics', 'Physics'],
      gradient: 'from-purple-500 to-pink-600',
      salary: '6–20 LPA', demand: 'High', risk: 'Low',
      skills: ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Git'],
      colleges: ['VIT Vellore', 'COEP Pune', 'DTU Delhi', 'Manipal University', 'SRM Chennai'],
    },
    {
      id: 'data-science', title: 'Data Scientist',
      tags: ['Data Science', 'Artificial Intelligence', 'Finance & Banking'],
      streams: ['Science (PCM)', 'Commerce', 'Science (PCMB)'],
      subjects: ['Mathematics', 'Statistics', 'Economics', 'Computer Science'],
      gradient: 'from-green-500 to-teal-600',
      salary: '7–22 LPA', demand: 'Very High', risk: 'Low',
      skills: ['Python/R', 'Pandas', 'Statistics', 'Machine Learning', 'Tableau'],
      colleges: ['IIT Kharagpur', 'ISI Kolkata', 'IIM Bangalore', 'IIIT Hyderabad', 'NIT Surathkal'],
    },
    {
      id: 'doctor', title: 'Medical Doctor (MBBS/MD)',
      tags: ['Medicine & Healthcare'],
      streams: ['Science (PCB)', 'Science (PCMB)'],
      subjects: ['Biology', 'Chemistry', 'Physics'],
      gradient: 'from-red-500 to-rose-600',
      salary: '6–40 LPA', demand: 'High', risk: 'Low',
      skills: ['Clinical Diagnosis', 'Patient Care', 'Medical Research', 'Surgery', 'Anatomy'],
      colleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER Puducherry', 'KEM Mumbai', 'AFMC Pune'],
    },
    {
      id: 'ca', title: 'Chartered Accountant (CA)',
      tags: ['Finance & Banking', 'Business & Entrepreneurship'],
      streams: ['Commerce', 'Science (PCM)'],
      subjects: ['Accountancy', 'Economics', 'Mathematics', 'Business Studies'],
      gradient: 'from-amber-500 to-orange-600',
      salary: '7–25 LPA', demand: 'High', risk: 'Low',
      skills: ['Financial Accounting', 'Tax Laws', 'Audit', 'GST', 'Excel & Tally'],
      colleges: ['ICAI (All India)', 'Symbiosis Pune', 'SRCC Delhi', 'Christ University', 'Loyola Chennai'],
    },
    {
      id: 'civil-service', title: 'IAS / Civil Services Officer',
      tags: ['Government & Civil Services', 'Law & Justice', 'Social Work & NGO'],
      streams: ['Arts/Humanities', 'Science (PCM)', 'Commerce', 'Science (PCB)'],
      subjects: ['History', 'Political Science', 'Economics', 'Geography', 'Sociology'],
      gradient: 'from-indigo-500 to-blue-700',
      salary: '10–30 LPA', demand: 'Medium', risk: 'Low',
      skills: ['Essay Writing', 'General Knowledge', 'Critical Thinking', 'Leadership', 'Ethics'],
      colleges: ['Delhi University', 'JNU Delhi', 'Jawaharlal Nehru University', 'BHU Varanasi', 'Hyderabad University'],
    },
    {
      id: 'ux-designer', title: 'UX/Product Designer',
      tags: ['Design & Arts', 'Technology & Software', 'E-commerce & Marketing'],
      streams: ['Arts/Humanities', 'Science (PCM)', 'Commerce'],
      subjects: ['Computer Science', 'Fine Arts', 'English', 'Mathematics'],
      gradient: 'from-pink-500 to-fuchsia-600',
      salary: '5–18 LPA', demand: 'High', risk: 'Medium',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Thinking', 'Adobe XD'],
      colleges: ['NID Ahmedabad', 'IIT Bombay IDC', 'Symbiosis Institute of Design', 'MIT Institute of Design', 'Pearl Academy'],
    },
    {
      id: 'entrepreneur', title: 'Startup Founder / Entrepreneur',
      tags: ['Business & Entrepreneurship', 'E-commerce & Marketing', 'Technology & Software'],
      streams: ['Commerce', 'Science (PCM)', 'Arts/Humanities', 'Science (PCB)'],
      subjects: ['Business Studies', 'Economics', 'Computer Science', 'Mathematics'],
      gradient: 'from-yellow-500 to-amber-600',
      salary: '0–50+ LPA (Variable)', demand: 'High', risk: 'Medium',
      skills: ['Business Strategy', 'Marketing', 'Financial Planning', 'Leadership', 'Networking'],
      colleges: ['IIM Ahmedabad', 'IIM Bangalore', 'ISB Hyderabad', 'XLRI Jamshedpur', 'SP Jain Mumbai'],
    },
    {
      id: 'cybersecurity', title: 'Cybersecurity Engineer',
      tags: ['Technology & Software', 'Artificial Intelligence'],
      streams: ['Science (PCM)', 'Vocational'],
      subjects: ['Computer Science', 'Mathematics', 'Physics'],
      gradient: 'from-slate-500 to-gray-700',
      salary: '6–22 LPA', demand: 'Very High', risk: 'Low',
      skills: ['Network Security', 'Ethical Hacking', 'Linux', 'Python', 'SIEM Tools'],
      colleges: ['IIT Delhi', 'NIT Warangal', 'IIIT Hyderabad', 'VIT Vellore', 'BITS Pilani'],
    },
    {
      id: 'journalist', title: 'Journalist / Media Professional',
      tags: ['Media & Journalism', 'Social Work & NGO'],
      streams: ['Arts/Humanities', 'Commerce'],
      subjects: ['English Literature', 'History', 'Political Science', 'Sociology'],
      gradient: 'from-orange-500 to-red-500',
      salary: '3–12 LPA', demand: 'Medium', risk: 'Medium',
      skills: ['Writing & Editing', 'Video Production', 'Research', 'Social Media', 'Interviewing'],
      colleges: ['IIMC Delhi', 'ACJ Chennai', 'Symbiosis Pune', 'Xavier Institute Mumbai', 'Jamia Millia Delhi'],
    },
  ];

  // Score each career by matching factors
  const scored = CAREER_POOL.map(career => {
    let score = 50;
    // Stream match
    if (career.streams.includes(stream)) score += 15;
    // Interest match (Primary driver)
    interests.forEach(i => { if (career.tags.includes(i)) score += 25; });
    // Subject match
    strong.forEach(s => { if (career.subjects.includes(s)) score += 10; });
    if (career.subjects.includes(favouriteSubject)) score += 12;
    // Score boost
    const numScore = parseFloat(percentage) || 75;
    if (numScore >= 90) score += 8;
    else if (numScore >= 75) score += 4;
    // Soft skill boost for leadership-heavy careers
    if (skills.includes('Leadership') && ['entrepreneur', 'civil-service'].includes(career.id)) score += 5;
    if (skills.includes('Creativity') && ['ux-designer', 'journalist', 'entrepreneur'].includes(career.id)) score += 5;

    return { ...career, rawScore: Math.min(98, Math.max(55, score)) };
  });

  const top3 = scored.sort((a, b) => b.rawScore - a.rawScore).slice(0, 3);

  const overallFit = Math.round((top3[0].rawScore + top3[1].rawScore + top3[2].rawScore) / 3);
  const futureProofScore = top3[0].risk === 'Low' ? Math.round(75 + Math.random() * 15) : Math.round(55 + Math.random() * 15);

  // Build roadmap for top career
  const roadmapSteps = buildRoadmap(top3[0], stream, futureProofScore);

  // Skill gaps
  const skillGaps = buildSkillGaps(top3[0], strong);

  return {
    profileSummary: buildProfileSummary(name, stream, favouriteSubject, percentage, strong, skills, interests),
    overallFit,
    careers: top3.map((c, i) => ({
      rank: i + 1,
      title: c.title,
      matchPercent: Math.round(c.rawScore - i * 5),
      reasoning: buildReasoning(c, name, stream, favouriteSubject, strong, skills, interests),
      salaryRange: c.salary,
      demandLevel: c.demand,
      automationRisk: c.risk,
      gradient: c.gradient,
      skills: c.skills,
      topColleges: c.colleges.slice(0, 3),
    })),
    roadmap: roadmapSteps,
    skillGaps,
    futureProofScore,
    futureProofAnalysis: `With a growing digital economy, India is investing heavily in ${top3[0].title.toLowerCase()} roles. With your academic background from the ${stream} stream and strengths in ${(strong[0] || favouriteSubject)}, your career choices are positioned well against automation. The Indian government's Digital India and Make in India initiatives further strengthen demand in these areas through 2030 and beyond.`,
    motivationalMessage: `${name || 'Dear student'}, your profile in ${stream} with strong performance of ${percentage} and passion for ${favouriteSubject} makes you an exceptional candidate for these career paths. Your combination of ${skills.slice(0, 2).join(' and ')} as soft skills gives you a competitive edge that goes beyond textbooks. Believe in your journey — the best is truly yet to come! 🚀`
  };
}

function buildProfileSummary(name, stream, favouriteSubject, percentage, strong, skills, interests) {
  const topInterest = interests[0] || 'technology';
  const topSkill = skills[0] || 'problem solving';
  const topSubject = strong[0] || favouriteSubject;
  return `${name || 'The student'} is a ${stream} student with a score of ${percentage}, showing particular strength in ${topSubject}. Their enthusiasm for ${favouriteSubject} combined with ${topInterest} interests reveals a curious and analytically sharp mind. With key soft skills like ${topSkill} and ${skills[1] || 'teamwork'}, they are well-prepared for the evolving Indian job market. This profile reflects a motivated learner ready to take on meaningful, future-forward career challenges.`;
}

function buildReasoning(career, name, stream, fav, strong, skills, interests) {
  const matchedInterest = interests.find(i => career.tags.includes(i)) || interests[0] || 'technology';
  const matchedSubject = strong.find(s => career.subjects.includes(s)) || fav;
  return `${name || 'Your'}'s academic background in ${fav} and ${stream} stream aligns well with the core requirements of a ${career.title}. Your interest in ${matchedInterest} directly maps to the growth trajectory of this field in India. Additionally, the strength in ${matchedSubject} provides a solid technical foundation that top recruiters in this domain actively look for.`;
}

function buildRoadmap(career, stream, score) {
  const roadmaps = {
    'ai-ml': {
      steps: [
        { month: 'Month 1-2', focus: 'Foundation', tasks: ['Learn Python fundamentals (NumPy, Pandas)', 'Complete Mathematics for ML (Linear Algebra, Probability)', 'Join Kaggle and solve beginner problems'] },
        { month: 'Month 3-4', focus: 'Core ML Skills', tasks: ['Study Scikit-Learn and supervised learning', 'Build 2 end-to-end ML projects', 'Start Deep Learning with TensorFlow/PyTorch'] },
        { month: 'Month 5-6', focus: 'Advanced & Launch', tasks: ['Work on NLP or Computer Vision projects', 'Publish projects on GitHub and Kaggle', 'Apply to internships at Indian AI startups'] },
      ]
    },
    'fullstack': {
      steps: [
        { month: 'Month 1-2', focus: 'Foundation', tasks: ['Master HTML, CSS 3 and JavaScript ES6+', 'Learn React.js core concepts', 'Build 3 frontend projects'] },
        { month: 'Month 3-4', focus: 'Backend & Databases', tasks: ['Learn Node.js and Express.js', 'Set up MongoDB and REST APIs', 'Connect frontend to backend (full-stack app)'] },
        { month: 'Month 5-6', focus: 'Deploy & Get Hired', tasks: ['Deploy on Vercel/Render/Railway', 'Build a SaaS-style portfolio project', 'Apply to internships on Internshala and LinkedIn'] },
      ]
    },
    'data-science': {
      steps: [
        { month: 'Month 1-2', focus: 'Foundation', tasks: ['Python + statistics fundamentals', 'Excel and SQL for data analysis', 'Complete Google Data Analytics Certificate'] },
        { month: 'Month 3-4', focus: 'ML & Visualization', tasks: ['Scikit-Learn and Pandas pipelines', 'Tableau or Power BI dashboard projects', 'Kaggle competitions (Bronze minimum)'] },
        { month: 'Month 5-6', focus: 'Industry Ready', tasks: ['Case study projects with real datasets', 'Build a data product end-to-end', 'Target data analyst roles at Indian startups'] },
      ]
    },
  };

  const steps = roadmaps[career.id]?.steps || [
    { month: 'Month 1-2', focus: 'Foundation & Learning', tasks: [`Study core subjects for ${career.title}`, 'Identify top 3 online courses on Coursera/Udemy', 'Join communities and Discord servers in this field'] },
    { month: 'Month 3-4', focus: 'Skill Building', tasks: ['Complete 1-2 certifications', 'Build portfolio projects applying what you learnt', 'Network with professionals on LinkedIn'] },
    { month: 'Month 5-6', focus: 'Launch Your Career', tasks: ['Apply for internships on Internshala, LinkedIn', 'Attend industry meetups and hackathons', 'Prepare your resume and GitHub portfolio'] },
  ];

  return { title: `6-Month Action Roadmap for ${career.title}`, steps };
}

function buildSkillGaps(career, strong) {
  const resources = [
    { skill: career.skills[0], importance: 'Critical', link: 'https://www.coursera.org', time: '4-6 weeks' },
    { skill: career.skills[1] || 'Communication', importance: 'Important', link: 'https://www.udemy.com', time: '2-3 weeks' },
    { skill: career.skills[2] || 'Portfolio Projects', importance: 'Important', link: 'https://www.github.com', time: '3-4 weeks' },
    { skill: career.skills[3] || 'Interview Preparation', importance: 'Good to Have', link: 'https://www.interviewbit.com', time: '2 weeks' },
  ];
  return resources.map(r => ({ skill: r.skill, importance: r.importance, resourceLink: r.link, timeToLearn: r.time }));
}

function buildPrompt(userData) {
  const { name, stream, favouriteSubject, percentage, strongSubjects, softSkills, careerInterests } = userData;
  return `You are an expert Indian career counselor. Analyze this student and return ONLY valid JSON (no markdown).

STUDENT: Name: ${name}, Stream: ${stream}, Favourite: ${favouriteSubject}, Score: ${percentage}, Strong: ${Array.isArray(strongSubjects) ? strongSubjects.join(', ') : strongSubjects}, Skills: ${Array.isArray(softSkills) ? softSkills.join(', ') : softSkills}, Interests: ${Array.isArray(careerInterests) ? careerInterests.join(', ') : careerInterests}

Return JSON with these exact keys: profileSummary (string), overallFit (number 70-98), careers (array of 3: rank, title, matchPercent 65-97, reasoning, salaryRange in LPA format, demandLevel one of Low/Medium/High/Very High, automationRisk one of Low/Medium/High, gradient string, skills array, topColleges array of Indian colleges), roadmap (title + steps array of 3 with month/focus/tasks), skillGaps (array of 3-4 with skill/importance/resourceLink/timeToLearn), futureProofScore (40-95), futureProofAnalysis (string), motivationalMessage (string). India-focused. ONLY recommend careers that match the STUDENT'S INTERESTS. Only JSON, no other text.`;
}
