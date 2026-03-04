// Simulated AI logic for Career Recommendations

const CAREER_DATABASE = [
    {
        id: 'fullstack',
        title: 'Full Stack Developer',
        suitability: 'Your strong foundation in React.js and interest in Web Development makes this a perfect match.',
        salary: '$85,000 - $145,000',
        demand: 'High',
        matchScore: 95,
        gradient: 'from-blue-500 to-cyan-500',
        missingSkills: ['Node.js (Advanced)', 'Docker', 'PostgreSQL', 'GraphQL'],
        skills: [
            { name: 'Frontend', score: 90 },
            { name: 'Backend', score: 85 },
            { name: 'Database', score: 70 },
            { name: 'DevOps', score: 60 },
        ],
        roadmap: [
            { month: 'Month 1', title: 'Advanced Frontend & State Management', items: ['Master Redux/Zustand', 'Advanced React Patterns', 'Tailwind CSS animations'] },
            { month: 'Month 2', title: 'Backend Foundation', items: ['Node.js Essentials', 'Express.js Routing', 'REST API Design'] },
            { month: 'Month 3', title: 'Databases & Auth', items: ['PostgreSQL Schema Design', 'JWT Authentication', 'ORM (Prisma/TypeORM)'] },
            { month: 'Month 4', title: 'Full Stack Integration', items: ['Connecting Frontend to Backend', 'Real-time features with Socket.io', 'Unit Testing'] },
            { month: 'Month 5', title: 'DevOps & Deployment', items: ['Docker Containerization', 'CI/CD Pipelines', 'AWS/Vercel Deployment'] },
            { month: 'Month 6', title: 'Portfolio & Capstone', items: ['Building a production-grade app', 'Optimizing for Core Web Vitals', 'Interview Prep'] },
        ]
    },
    {
        id: 'ai-engineer',
        title: 'AI Solutions Architect',
        suitability: 'With your proficiency in Python and interest in AI, you are well-positioned for roles in intelligent systems.',
        salary: '$120,000 - $200,000',
        demand: 'Very High',
        matchScore: 88,
        gradient: 'from-purple-500 to-pink-500',
        missingSkills: ['PyTorch/TensorFlow', 'LLM Fine-tuning', 'Vector Databases', 'Prompt Engineering'],
        skills: [
            { name: 'Python', score: 95 },
            { name: 'ML Models', score: 80 },
            { name: 'Cloud API', score: 75 },
            { name: 'Data Eng', score: 65 },
        ],
        roadmap: [
            { month: 'Month 1', title: 'Advanced Python & Math', items: ['NumPy/Pandas mastery', 'Linear Algebra for ML', 'Probability basics'] },
            { month: 'Month 2', title: 'Machine Learning Fundamentals', items: ['Scikit-Learn', 'Supervised vs Unsupervised', 'Feature Engineering'] },
            { month: 'Month 3', title: 'Deep Learning', items: ['Neural Networks basics', 'Introduction to PyTorch', 'CNNs & RNNs'] },
            { month: 'Month 4', title: 'Natural Language Processing', items: ['Tokenization & Embeddings', 'LSTMs', 'Transformers architecture'] },
            { month: 'Month 5', title: 'Generative AI & LLMs', items: ['LangChain/LlamaIndex', 'Fine-tuning models', 'Prompt Engineering'] },
            { month: 'Month 6', title: 'Deployment & Ethics', items: ['Serving models with FastAPI', 'MLOps basics', 'AI Ethics & Bias'] },
        ]
    }
];

export const generateRecommendations = (userData) => {
    // In a real app, this would be a prompt to an AI API
    // Here we simulate the selection based on top matches
    return CAREER_DATABASE.sort(() => 0.5 - Math.random()).slice(0, 3);
};
