import bcrypt from 'bcryptjs';
import { connectDB, FileDB, isMongoConnected } from '../config/db.js';

export const seedCareers = [
  {
    id: 'car_fullstack',
    title: 'Full Stack Software Developer',
    category: 'Software Development',
    description: 'Build end-to-end web applications, master frontend user interfaces, robust backend APIs, and scalable database architectures.',
    requiredSkills: [
      { name: 'React', requiredLevel: 90, importance: 'Critical' },
      { name: 'JavaScript', requiredLevel: 90, importance: 'Critical' },
      { name: 'Node.js', requiredLevel: 85, importance: 'Critical' },
      { name: 'Data Structures & Algorithms', requiredLevel: 85, importance: 'High' },
      { name: 'SQL', requiredLevel: 80, importance: 'High' },
      { name: 'Git', requiredLevel: 75, importance: 'Medium' }
    ],
    salaryRange: { min: 800000, max: 2400000, avg: 1400000, currency: 'INR' },
    demand: 'Very High',
    growthRate: '+24% YoY',
    industries: ['FinTech', 'SaaS', 'E-Commerce', 'HealthTech', 'EdTech'],
    whyMatchesTemplate: [
      'Strong proficiency in modern JavaScript/React frameworks.',
      'Aptitude for full-stack system architecture and backend API design.',
      'High market demand with over 45,000+ open positions.'
    ],
    roadmapStages: [
      { stage: 1, title: 'Web Foundations', description: 'HTML5, CSS3, Modern JavaScript (ES6+), DOM Manipulation, Responsive Design', skills: ['HTML', 'CSS', 'JavaScript'] },
      { stage: 2, title: 'Frontend Frameworks', description: 'React.js, State Management (Redux/Zustand), Tailwind CSS, REST API integration', skills: ['React', 'Tailwind CSS', 'Redux'] },
      { stage: 3, title: 'Backend Engineering', description: 'Node.js, Express.js, Async programming, Database design (MongoDB & PostgreSQL)', skills: ['Node.js', 'Express', 'MongoDB', 'SQL'] },
      { stage: 4, title: 'DevOps & Tooling', description: 'Git version control, Docker containerization, CI/CD pipelines, Cloud Deployment', skills: ['Git', 'Docker', 'AWS/Vercel'] },
      { stage: 5, title: 'Full Stack Capstone & Interview Prep', description: 'Production full-stack project, System design basics, LeetCode DSA practice', skills: ['System Design', 'DSA', 'Projects'] }
    ]
  },
  {
    id: 'car_dataanalyst',
    title: 'Data Analyst',
    category: 'Data Science & Analytics',
    description: 'Transform complex raw dataset into actionable business insights using SQL, Python, statistics, and interactive BI dashboards.',
    requiredSkills: [
      { name: 'SQL', requiredLevel: 85, importance: 'Critical' },
      { name: 'Python', requiredLevel: 80, importance: 'Critical' },
      { name: 'Data Analytics', requiredLevel: 85, importance: 'Critical' },
      { name: 'Tableau / Power BI', requiredLevel: 75, importance: 'High' },
      { name: 'Statistics & Probability', requiredLevel: 75, importance: 'High' },
      { name: 'Excel / Spreadsheets', requiredLevel: 70, importance: 'Medium' }
    ],
    salaryRange: { min: 600000, max: 1800000, avg: 1050000, currency: 'INR' },
    demand: 'High',
    growthRate: '+28% YoY',
    industries: ['Banking & Finance', 'E-Commerce', 'Consulting', 'Marketing Tech'],
    whyMatchesTemplate: [
      'High quantitative assessment score and interest in data analytics.',
      'Strong logical query building skills in SQL and data manipulation.',
      'Fastest growing career path across enterprise organizations.'
    ],
    roadmapStages: [
      { stage: 1, title: 'Data Analytics Fundamentals', description: 'Advanced Excel, Descriptive Statistics, Data Cleaning & Preprocessing', skills: ['Excel', 'Statistics'] },
      { stage: 2, title: 'Mastering Database Queries', description: 'SQL Joins, Aggregations, Window Functions, Database Indexing', skills: ['SQL', 'PostgreSQL'] },
      { stage: 3, title: 'Python for Data Analysis', description: 'Pandas, NumPy, Matplotlib, Seaborn for Exploratory Data Analysis (EDA)', skills: ['Python', 'Pandas', 'NumPy'] },
      { stage: 4, title: 'Business Intelligence & Dashboards', description: 'Power BI / Tableau visual stories, KPI metrics, Automated reporting', skills: ['Power BI', 'Tableau'] },
      { stage: 5, title: 'Real-World Case Studies', description: 'Customer churn analysis, Sales forecasting, A/B testing analytics', skills: ['A/B Testing', 'Case Studies'] }
    ]
  },
  {
    id: 'car_mlengine',
    title: 'Machine Learning Engineer',
    category: 'Artificial Intelligence',
    description: 'Design, train, and deploy predictive Machine Learning and Deep Learning models into scalable production systems.',
    requiredSkills: [
      { name: 'Python', requiredLevel: 95, importance: 'Critical' },
      { name: 'Machine Learning', requiredLevel: 90, importance: 'Critical' },
      { name: 'Data Structures & Algorithms', requiredLevel: 85, importance: 'High' },
      { name: 'Mathematics & Linear Algebra', requiredLevel: 80, importance: 'High' },
      { name: 'PyTorch / TensorFlow', requiredLevel: 80, importance: 'High' },
      { name: 'MLOps', requiredLevel: 70, importance: 'Medium' }
    ],
    salaryRange: { min: 1000000, max: 3200000, avg: 1850000, currency: 'INR' },
    demand: 'Very High',
    growthRate: '+36% YoY',
    industries: ['AI Research', 'Autonomous Systems', 'FinTech', 'Healthcare AI'],
    whyMatchesTemplate: [
      'Exceptional algorithmic problem solving and mathematical background.',
      'Passion for artificial intelligence, computer vision, and NLP.',
      'Top-tier salary packages in modern tech ecosystems.'
    ],
    roadmapStages: [
      { stage: 1, title: 'Python & Math Foundations', description: 'Python OOP, Linear Algebra, Calculus, Multivariate Probability', skills: ['Python', 'Linear Algebra'] },
      { stage: 2, title: 'Classic Machine Learning', description: 'Supervised/Unsupervised Learning, Regression, Trees, Scikit-Learn', skills: ['Scikit-Learn', 'ML Algorithms'] },
      { stage: 3, title: 'Deep Learning & Neural Nets', description: 'Neural Networks, PyTorch/TensorFlow, CNNs, Transformers, LLMs', skills: ['PyTorch', 'TensorFlow', 'Deep Learning'] },
      { stage: 4, title: 'MLOps & Deployment', description: 'FastAPI model wrapping, Docker containerization, Model Monitoring', skills: ['FastAPI', 'Docker', 'MLOps'] },
      { stage: 5, title: 'Production Capstone Project', description: 'End-to-end sentiment analyzer or predictive engine deployment', skills: ['Production AI', 'Projects'] }
    ]
  },
  {
    id: 'car_devops',
    title: 'Cloud & DevOps Engineer',
    category: 'Cloud Infrastructure',
    description: 'Automate software deployment pipelines, manage resilient cloud infrastructure (AWS/Azure), and maintain 99.99% system availability.',
    requiredSkills: [
      { name: 'Cloud Computing (AWS/Azure)', requiredLevel: 85, importance: 'Critical' },
      { name: 'Docker & Kubernetes', requiredLevel: 85, importance: 'Critical' },
      { name: 'Linux Administration', requiredLevel: 80, importance: 'High' },
      { name: 'CI/CD Pipelines', requiredLevel: 80, importance: 'High' },
      { name: 'Python / Bash Scripting', requiredLevel: 75, importance: 'Medium' }
    ],
    salaryRange: { min: 900000, max: 2600000, avg: 1500000, currency: 'INR' },
    demand: 'High',
    growthRate: '+22% YoY',
    industries: ['Cloud Managed Services', 'Enterprise SaaS', 'FinTech', 'Telecom'],
    whyMatchesTemplate: [
      'Strong systemic thinking and interest in automation and server architecture.',
      'Crucial operational role in modern software engineering teams.'
    ],
    roadmapStages: [
      { stage: 1, title: 'Linux & Scripting', description: 'Linux CLI, Bash scripting, Networking principles, SSH & Security', skills: ['Linux', 'Bash', 'Networking'] },
      { stage: 2, title: 'Cloud Infrastructure', description: 'AWS EC2, S3, VPC, IAM, Azure fundamentals & IAM policy management', skills: ['AWS', 'Cloud'] },
      { stage: 3, title: 'Containerization & Orchestration', description: 'Docker containers, Kubernetes clusters, Helm charts, Service mesh', skills: ['Docker', 'Kubernetes'] },
      { stage: 4, title: 'Infrastructure as Code (IaC)', description: 'Terraform modules, Ansible automation, GitHub Actions CI/CD', skills: ['Terraform', 'CI/CD'] },
      { stage: 5, title: 'Site Reliability Engineering', description: 'Prometheus & Grafana monitoring, Security compliance, Incident response', skills: ['Monitoring', 'SRE'] }
    ]
  },
  {
    id: 'car_cybersec',
    title: 'Cybersecurity Analyst',
    category: 'Information Security',
    description: 'Protect enterprise networks, conduct vulnerability assessments, penetration testing, and respond to security threats.',
    requiredSkills: [
      { name: 'Network Security', requiredLevel: 85, importance: 'Critical' },
      { name: 'Ethical Hacking / PenTesting', requiredLevel: 80, importance: 'High' },
      { name: 'Linux Security', requiredLevel: 80, importance: 'High' },
      { name: 'SIEM & Threat Analysis', requiredLevel: 75, importance: 'Medium' }
    ],
    salaryRange: { min: 750000, max: 2200000, avg: 1250000, currency: 'INR' },
    demand: 'High',
    growthRate: '+32% YoY',
    industries: ['Defense & Govt', 'Banking & Defense', 'Cyber Firms'],
    whyMatchesTemplate: [
      'High problem-solving acuity and vigilance for security architecture.',
      'Huge demand due to rising global cybersecurity compliance needs.'
    ],
    roadmapStages: [
      { stage: 1, title: 'Networking & Security Basics', description: 'OSI Model, TCP/IP, Cryptography, Wireshark packet capture', skills: ['Networking', 'Cryptography'] },
      { stage: 2, title: 'Linux & Penetration Testing Tools', description: 'Kali Linux, Nmap, Burp Suite, Metasploit basics', skills: ['Kali Linux', 'Penetration Testing'] },
      { stage: 3, title: 'Security Operations & SIEM', description: 'Log monitoring, Splunk, Incident response playbooks', skills: ['SIEM', 'Splunk'] },
      { stage: 4, title: 'Certifications & Labs', description: 'CompTIA Security+, CEH, TryHackMe & HackTheBox challenges', skills: ['CompTIA Security+', 'Labs'] }
    ]
  },
  {
    id: 'car_uiux',
    title: 'UI/UX Product Designer',
    category: 'Design & User Experience',
    description: 'Design intuitive, visually captivating user interfaces, craft user research journeys, and build interactive Figma prototypes.',
    requiredSkills: [
      { name: 'Figma / Wireframing', requiredLevel: 90, importance: 'Critical' },
      { name: 'User Research & Testing', requiredLevel: 80, importance: 'High' },
      { name: 'Design Systems', requiredLevel: 85, importance: 'High' },
      { name: 'HTML/CSS Basics', requiredLevel: 65, importance: 'Medium' }
    ],
    salaryRange: { min: 550000, max: 1700000, avg: 980000, currency: 'INR' },
    demand: 'Moderate',
    growthRate: '+18% YoY',
    industries: ['Creative Agencies', 'Consumer Mobile Apps', 'SaaS Platforms'],
    whyMatchesTemplate: [
      'Creativity combined with empathy for customer product experiences.',
      'Strong eye for visual aesthetics and interactive component hierarchy.'
    ],
    roadmapStages: [
      { stage: 1, title: 'UI Fundamentals', description: 'Color theory, Typography, Spacing, Visual Hierarchy, Layout grids', skills: ['UI Design', 'Color Theory'] },
      { stage: 2, title: 'Figma Mastery', description: 'Auto-layout, Components, Variants, Interactive Prototyping', skills: ['Figma', 'Prototyping'] },
      { stage: 3, title: 'UX Research & Journeys', description: 'User personas, Wireframing, Usability testing, Information Architecture', skills: ['UX Research', 'Wireframing'] },
      { stage: 4, title: 'Design Systems & Portfolio', description: 'Building scalable design libraries and case studies on Behance/Dribbble', skills: ['Design Systems', 'Portfolio'] }
    ]
  },
  {
    id: 'car_pm',
    title: 'Product Manager',
    category: 'Product & Strategy',
    description: 'Bridge tech, business, and design teams. Define product roadmap visions, write spec requirements, and launch customer-loved features.',
    requiredSkills: [
      { name: 'Product Management', requiredLevel: 85, importance: 'Critical' },
      { name: 'Agile & Scrum', requiredLevel: 80, importance: 'High' },
      { name: 'Data Analytics', requiredLevel: 75, importance: 'High' },
      { name: 'Communication', requiredLevel: 90, importance: 'Critical' },
      { name: 'Leadership', requiredLevel: 85, importance: 'High' }
    ],
    salaryRange: { min: 1000000, max: 3000000, avg: 1750000, currency: 'INR' },
    demand: 'High',
    growthRate: '+20% YoY',
    industries: ['Tech Unicorns', 'E-Commerce', 'B2B SaaS', 'FinTech'],
    whyMatchesTemplate: [
      'High leadership capability and strategic business problem solving.',
      'Excellent communication score matching cross-functional team management.'
    ],
    roadmapStages: [
      { stage: 1, title: 'Product Foundations', description: 'Product Lifecycle, PRD Writing, Customer Discovery, Competitor Analysis', skills: ['PRD Writing', 'Market Research'] },
      { stage: 2, title: 'Agile Execution', description: 'Scrum sprint planning, Jira/Linear, Backlog prioritization (RICE/Kano)', skills: ['Agile', 'Scrum', 'Jira'] },
      { stage: 3, title: 'Product Analytics', description: 'Mixpanel, Amplitude, Funnel metrics, Retention & Cohort Analysis', skills: ['Analytics', 'Mixpanel'] },
      { stage: 4, title: 'Product Strategy & Launch', description: 'Go-To-Market (GTM) strategy, Pricing models, Product teardown portfolio', skills: ['GTM Strategy', 'Teardowns'] }
    ]
  },
  {
    id: 'car_finanalytics',
    title: 'Financial Data Analyst',
    category: 'Finance & Analytics',
    description: 'Apply statistical analysis, Python, and financial modeling to analyze markets, forecast portfolio risks, and optimize investments.',
    requiredSkills: [
      { name: 'Financial Modeling', requiredLevel: 85, importance: 'Critical' },
      { name: 'Excel / Spreadsheets', requiredLevel: 90, importance: 'Critical' },
      { name: 'Python', requiredLevel: 75, importance: 'High' },
      { name: 'SQL', requiredLevel: 75, importance: 'High' }
    ],
    salaryRange: { min: 700000, max: 2100000, avg: 1200000, currency: 'INR' },
    demand: 'Moderate',
    growthRate: '+16% YoY',
    industries: ['Investment Banking', 'Hedge Funds', 'FinTech', 'Wealth Management'],
    whyMatchesTemplate: [
      'Strong mathematical rigor combined with interest in financial technology.',
      'Blend of corporate finance knowledge and modern programming skills.'
    ],
    roadmapStages: [
      { stage: 1, title: 'Financial Accounting & Valuation', description: 'Balance sheets, DCF models, Ratio analysis, Corporate finance', skills: ['Accounting', 'DCF Valuation'] },
      { stage: 2, title: 'Advanced Financial Modeling in Excel', description: 'VBA macros, Sensitivity analysis, LBO & M&A models', skills: ['Excel VBA', 'Financial Modeling'] },
      { stage: 3, title: 'Python for Quantitative Finance', description: 'Pandas, QuantLib, Monte Carlo simulations, Time series analysis', skills: ['Python', 'Time Series'] },
      { stage: 4, title: 'SQL & Market Data Feeds', description: 'Bloomberg terminal fundamentals, SQL database querying for financial feeds', skills: ['SQL', 'Market Data'] }
    ]
  }
];

export const seedCourses = [
  {
    id: 'crs_react_mastery',
    title: 'Modern React 18 & Redux Toolkit Complete Guide',
    platform: 'Udemy',
    skills: ['React', 'JavaScript', 'Redux'],
    level: 'Intermediate',
    duration: '42 hours',
    rating: 4.8,
    priceType: 'Paid',
    url: 'https://udemy.com',
    careerCategory: 'Software Development',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'crs_dsa_java',
    title: 'Data Structures & Algorithms Bootcamp: Zero to Hero',
    platform: 'Coursera',
    skills: ['Data Structures & Algorithms', 'Problem Solving', 'Java'],
    level: 'Beginner',
    duration: '60 hours',
    rating: 4.9,
    priceType: 'Free',
    url: 'https://coursera.org',
    careerCategory: 'Software Development',
    thumbnail: 'https://images.unsplash.com/photo-1516116211223-4c7141940984?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'crs_sql_data',
    title: 'The Complete SQL & Database Mastery for Data Analytics',
    platform: 'edX',
    skills: ['SQL', 'Data Analytics', 'PostgreSQL'],
    level: 'Beginner',
    duration: '25 hours',
    rating: 4.7,
    priceType: 'Free',
    url: 'https://edx.org',
    careerCategory: 'Data Science & Analytics',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'crs_python_data',
    title: 'Python for Data Science, Machine Learning & Analytics',
    platform: 'Coursera',
    skills: ['Python', 'Data Analytics', 'Machine Learning'],
    level: 'Intermediate',
    duration: '35 hours',
    rating: 4.9,
    priceType: 'Paid',
    url: 'https://coursera.org',
    careerCategory: 'Data Science & Analytics',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'crs_aws_devops',
    title: 'AWS Certified Solutions Architect & Docker DevOps',
    platform: 'Udemy',
    skills: ['Cloud Computing (AWS/Azure)', 'Docker & Kubernetes', 'CI/CD Pipelines'],
    level: 'Intermediate',
    duration: '48 hours',
    rating: 4.8,
    priceType: 'Paid',
    url: 'https://udemy.com',
    careerCategory: 'Cloud Infrastructure',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'crs_deeplearning',
    title: 'Deep Learning Specialization by Andrew Ng',
    platform: 'Coursera',
    skills: ['Machine Learning', 'PyTorch / TensorFlow', 'Python'],
    level: 'Advanced',
    duration: '80 hours',
    rating: 4.95,
    priceType: 'Free',
    url: 'https://coursera.org',
    careerCategory: 'Artificial Intelligence',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'crs_figma_uiux',
    title: 'Figma UI/UX Design Essentials & Prototype Systems',
    platform: 'YouTube',
    skills: ['Figma / Wireframing', 'Design Systems', 'User Research & Testing'],
    level: 'Beginner',
    duration: '18 hours',
    rating: 4.85,
    priceType: 'Free',
    url: 'https://youtube.com',
    careerCategory: 'Design & User Experience',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'crs_product_mgmt',
    title: 'Become a Product Manager | Learn the Skills & Get the Job',
    platform: 'Udemy',
    skills: ['Product Management', 'Agile & Scrum', 'Leadership'],
    level: 'Intermediate',
    duration: '22 hours',
    rating: 4.75,
    priceType: 'Paid',
    url: 'https://udemy.com',
    careerCategory: 'Product & Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60'
  }
];

export const seedAssessment = {
  id: 'assess_standard_v1',
  title: 'CareerPath AI Aptitude & Technical Competency Diagnostic',
  questions: [
    {
      id: 'q1',
      question: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
      category: 'Technical Knowledge',
      options: ['Stack', 'Queue', 'Binary Tree', 'Graph'],
      correctAnswer: 1,
      explanation: 'Queues process elements in the order they arrive (First In First Out).'
    },
    {
      id: 'q2',
      question: 'In SQL, which clause is used to filter records AFTER an aggregation operation (GROUP BY)?',
      category: 'Technical Knowledge',
      options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
      correctAnswer: 1,
      explanation: 'HAVING filters aggregate values, whereas WHERE filters individual rows prior to aggregation.'
    },
    {
      id: 'q3',
      question: 'If a train traveling at 60 km/h crosses a 200m platform in 24 seconds, what is the length of the train?',
      category: 'Quantitative Aptitude',
      options: ['150 m', '200 m', '250 m', '300 m'],
      correctAnswer: 1,
      explanation: 'Speed = 60 * (5/18) = 50/3 m/s. Total distance = speed * time = (50/3)*24 = 400m. Train length = 400 - 200 = 200m.'
    },
    {
      id: 'q4',
      question: 'Complete the series: 3, 7, 15, 31, 63, ?',
      category: 'Logical Reasoning',
      options: ['125', '127', '129', '131'],
      correctAnswer: 1,
      explanation: 'Each term is (previous * 2) + 1. 63 * 2 + 1 = 127.'
    },
    {
      id: 'q5',
      question: 'What is the primary objective of Supervised Machine Learning?',
      category: 'Technical Knowledge',
      options: ['Clustering unlabelled data points', 'Predicting target outcomes using labeled training pairs', 'Navigating environments via reward signals', 'Compressing high-dimensional data'],
      correctAnswer: 1,
      explanation: 'Supervised learning trains models on labeled input-output pairs to learn a mapping function.'
    },
    {
      id: 'q6',
      question: 'Choose the sentence with correct grammatical structure and professional clarity:',
      category: 'Communication',
      options: [
        'Me and him completed the project code yesterday.',
        'Neither the team lead nor the developers were aware of the server outage.',
        'The project was finish on time by our team.',
        'We should of tested the production build earlier.'
      ],
      correctAnswer: 1,
      explanation: 'Choice 2 correctly uses subject-verb agreement with "neither/nor".'
    },
    {
      id: 'q7',
      question: 'In a software team, if a critical bug is discovered 2 hours before release, what is the best initial approach?',
      category: 'Problem Solving',
      options: [
        'Ignore the bug and release on schedule',
        'Triage the bug severity with the engineering lead, document impact, and communicate options to stakeholders',
        'Blame the developer who wrote the feature',
        'Cancel the entire project indefinitely'
      ],
      correctAnswer: 1,
      explanation: 'Systematic triage and transparent stakeholder communication is standard engineering practice.'
    },
    {
      id: 'q8',
      question: 'What does the time complexity O(log N) represent in Binary Search?',
      category: 'Technical Knowledge',
      options: ['Linear time growth', 'Constant time growth', 'Logarithmic reduction of search space by half each iteration', 'Quadratic time growth'],
      correctAnswer: 2,
      explanation: 'Binary Search halves the search space at each step, yielding logarithmic logarithmic complexity.'
    }
  ]
};

export const seedJobMarket = {
  id: 'jobmarket_global_2026',
  topInDemandSkills: ['Python', 'SQL', 'React', 'Cloud Computing (AWS)', 'Machine Learning', 'Docker', 'Data Analytics', 'TypeScript'],
  salaryByExperience: [
    { experience: '0-1 Years (Entry Level)', salary: 650000 },
    { experience: '1-3 Years (Junior)', salary: 1050000 },
    { experience: '3-5 Years (Mid Level)', salary: 1750000 },
    { experience: '5-8 Years (Senior)', salary: 2600000 },
    { experience: '8+ Years (Lead / Architect)', salary: 3800000 }
  ],
  locationDemand: [
    { location: 'Bengaluru', openPositions: 42000, avgSalary: 1450000 },
    { location: 'Hyderabad', openPositions: 28000, avgSalary: 1320000 },
    { location: 'Pune / Mumbai', openPositions: 24000, avgSalary: 1280000 },
    { location: 'NCR (Delhi/Gurugram)', openPositions: 22000, avgSalary: 1350000 },
    { location: 'Remote Global', openPositions: 35000, avgSalary: 1900000 }
  ],
  industryBreakdown: [
    { industry: 'Software & SaaS', percentage: 38 },
    { industry: 'FinTech & Banking', percentage: 24 },
    { industry: 'E-Commerce & Retail', percentage: 16 },
    { industry: 'Healthcare Tech', percentage: 12 },
    { industry: 'EdTech & Gaming', percentage: 10 }
  ],
  skillDemandGrowth: [
    { skill: 'Python', demandCount: 54000, growth: 32 },
    { skill: 'SQL', demandCount: 48000, growth: 28 },
    { skill: 'React.js', demandCount: 42000, growth: 25 },
    { skill: 'AWS Cloud', demandCount: 39000, growth: 35 },
    { skill: 'Machine Learning', demandCount: 31000, growth: 42 },
    { skill: 'Docker / K8s', demandCount: 29000, growth: 29 }
  ]
};

export const runSeed = async () => {
  await connectDB();

  const careerStore = new FileDB('careers');
  const courseStore = new FileDB('courses');
  const assessmentStore = new FileDB('assessments');
  const jobMarketStore = new FileDB('jobmarket');
  const userStore = new FileDB('users');

  // Seed Careers
  careerStore.deleteMany({});
  seedCareers.forEach(c => careerStore.create(c));

  // Seed Courses
  courseStore.deleteMany({});
  seedCourses.forEach(c => courseStore.create(c));

  // Seed Assessment
  assessmentStore.deleteMany({});
  assessmentStore.create(seedAssessment);

  // Seed Job Market
  jobMarketStore.deleteMany({});
  jobMarketStore.create(seedJobMarket);

  // Seed Demo Users if not present
  const existingStudent = userStore.findOne({ email: 'student@example.com' });
  const hashedPassword = await bcrypt.hash('password123', 10);

  if (!existingStudent) {
    userStore.create({
      name: 'Alex Johnson',
      email: 'student@example.com',
      password: hashedPassword,
      role: 'student',
      education: {
        degree: 'B.Tech',
        branch: 'Computer Science',
        year: '3rd Year',
        cgpa: 8.4,
        gradYear: '2026',
        college: 'National Institute of Technology'
      },
      skills: [
        { name: 'JavaScript', level: 'Intermediate', score: 75 },
        { name: 'React', level: 'Intermediate', score: 70 },
        { name: 'SQL', level: 'Beginner', score: 45 },
        { name: 'Data Structures & Algorithms', level: 'Intermediate', score: 65 },
        { name: 'Python', level: 'Beginner', score: 50 },
        { name: 'Communication', level: 'Advanced', score: 85 }
      ],
      interests: ['Software Development', 'Data Science', 'Artificial Intelligence'],
      careerGoals: {
        preferredCareer: 'Full Stack Software Developer',
        industry: 'FinTech / SaaS',
        preferredRole: 'Frontend / Full Stack Engineer',
        expectedSalary: '12,000,000 INR',
        preferredLocation: 'Bengaluru / Remote',
        higherStudies: 'No',
        remotePreference: 'Hybrid'
      },
      assessmentResults: {
        score: 78,
        completedAt: new Date().toISOString()
      },
      progress: {
        completedCourses: ['Modern React 18 & Redux Toolkit Complete Guide'],
        completedSkills: ['HTML', 'CSS', 'JavaScript'],
        streakDays: 14,
        hoursSpent: 48,
        monthlyProgress: [
          { month: 'Nov', score: 42 },
          { month: 'Dec', score: 58 },
          { month: 'Jan', score: 71 },
          { month: 'Feb', score: 78 }
        ]
      },
      projects: [
        { title: 'E-Commerce Platform', description: 'Full stack shopping cart with React & Node', techStack: ['React', 'Node.js', 'MongoDB'] }
      ]
    });
  }

  const existingAdmin = userStore.findOne({ email: 'admin@careerpath.ai' });
  if (!existingAdmin) {
    userStore.create({
      name: 'CareerPath Admin',
      email: 'admin@careerpath.ai',
      password: hashedPassword,
      role: 'admin',
      education: { degree: 'M.Tech', branch: 'Computer Science', year: 'Graduated' }
    });
  }

  console.log('✅ Database seeded with rich career, course, assessment, job market, and demo user data!');
};

if (process.argv[1].endsWith('seedData.js')) {
  runSeed().then(() => process.exit(0));
}
