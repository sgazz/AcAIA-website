// Mock podaci za development kada nema baze podataka

export const mockUsers = [
  {
    _id: 'mock-user-1',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'student',
    isActive: true,
    fullName: 'Test User',
    preferences: {},
    learningProgress: {},
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    comparePassword: async (password: string) => true
  },
  {
    _id: 'mock-user-2',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true,
    fullName: 'Admin User',
    preferences: {},
    learningProgress: {},
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    comparePassword: async (password: string) => true
  }
];

export const mockChats = [
  {
    _id: 'mock-chat-1',
    userId: 'mock-user-1',
    title: 'Pomoć sa matematikom',
    messages: [
      {
        role: 'user',
        content: 'Kako da rešim kvadratnu jednačinu?',
        timestamp: new Date('2024-01-01T10:00:00Z')
      },
      {
        role: 'assistant',
        content: 'Kvadratna jednačina ima oblik ax² + bx + c = 0. Možeš je rešiti koristeći formulu: x = (-b ± √(b² - 4ac)) / 2a',
        timestamp: new Date('2024-01-01T10:01:00Z')
      }
    ],
    createdAt: new Date('2024-01-01T10:00:00Z'),
    updatedAt: new Date('2024-01-01T10:01:00Z')
  }
];

export const mockProblems = [
  {
    _id: 'mock-problem-1',
    title: 'Kvadratna jednačina',
    description: 'Reši kvadratnu jednačinu: x² - 5x + 6 = 0',
    difficulty: 'medium',
    subject: 'mathematics',
    category: 'algebra',
    solution: 'x = 2 ili x = 3',
    explanation: 'Koristeći formulu x = (-b ± √(b² - 4ac)) / 2a, gde je a=1, b=-5, c=6',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    _id: 'mock-problem-2',
    title: 'Derivacija funkcije',
    description: 'Nađi prvi izvod funkcije f(x) = x³ + 2x² - 3x + 1',
    difficulty: 'hard',
    subject: 'mathematics',
    category: 'calculus',
    solution: 'f\'(x) = 3x² + 4x - 3',
    explanation: 'Koristeći pravila za derivaciju stepenih funkcija',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const mockExams = [
  {
    _id: 'mock-exam-1',
    title: 'Matematika - Kvadratne jednačine',
    description: 'Test znanja o kvadratnim jednačinama',
    subject: 'mathematics',
    duration: 30, // minuta
    questions: [
      {
        question: 'Reši jednačinu x² - 4x + 3 = 0',
        options: ['x = 1, x = 3', 'x = -1, x = -3', 'x = 1, x = -3', 'x = -1, x = 3'],
        correctAnswer: 0,
        explanation: 'Koristeći formulu za kvadratnu jednačinu'
      },
      {
        question: 'Koji je diskriminant jednačine x² + 2x + 1 = 0?',
        options: ['0', '1', '4', '8'],
        correctAnswer: 0,
        explanation: 'D = b² - 4ac = 4 - 4 = 0'
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const mockCareerPaths = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Razvoj softvera i aplikacija',
    skills: ['programming', 'problem-solving', 'teamwork'],
    salary: '€50,000 - €100,000',
    demand: 'high',
    education: 'Bachelor\'s degree in Computer Science'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analiza podataka i mašinsko učenje',
    skills: ['statistics', 'programming', 'machine-learning'],
    salary: '€60,000 - €120,000',
    demand: 'very high',
    education: 'Master\'s degree in Data Science'
  },
  {
    id: 'mathematics-teacher',
    title: 'Mathematics Teacher',
    description: 'Predavanje matematike u školama',
    skills: ['teaching', 'mathematics', 'communication'],
    salary: '€30,000 - €60,000',
    demand: 'medium',
    education: 'Bachelor\'s degree in Mathematics + Teaching certification'
  }
];

export const mockLearningPaths = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Put do postajanja web developera',
    steps: [
      { step: 1, title: 'HTML & CSS', duration: '2-3 nedelje', description: 'Osnove HTML-a i CSS-a' },
      { step: 2, title: 'JavaScript', duration: '4-6 nedelja', description: 'Programski jezik JavaScript' },
      { step: 3, title: 'React', duration: '6-8 nedelja', description: 'React framework' },
      { step: 4, title: 'Backend Development', duration: '8-12 nedelja', description: 'Node.js i Express' }
    ],
    totalDuration: '20-29 nedelja',
    difficulty: 'beginner'
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Put do postajanja data scientist-a',
    steps: [
      { step: 1, title: 'Python', duration: '4-6 nedelja', description: 'Osnove Python-a' },
      { step: 2, title: 'Statistics', duration: '6-8 nedelja', description: 'Statistička analiza' },
      { step: 3, title: 'Machine Learning', duration: '8-12 nedelja', description: 'Mašinsko učenje' },
      { step: 4, title: 'Deep Learning', duration: '10-14 nedelja', description: 'Duboko učenje' }
    ],
    totalDuration: '28-40 nedelja',
    difficulty: 'intermediate'
  }
];

// Mock AI odgovori
export const mockAIResponses = {
  chat: [
    'Evo kako možeš da rešiš ovaj problem...',
    'Dobra pitanja! Hajde da razložimo ovo korak po korak...',
    'Za ovu vrstu problema, treba da koristiš sledeći pristup...',
    'Odlično pitanje! Evo objašnjenja...'
  ],
  problemGeneration: [
    'Generisan problem: Reši jednačinu 2x + 5 = 13',
    'Novi problem: Nađi površinu kruga sa poluprečnikom 5cm',
    'Problem za tebe: Izračunaj 15% od 200'
  ],
  careerAdvice: [
    'Na osnovu tvojih veština, preporučujem karijeru u software development-u...',
    'Tvoji interesi se poklapaju sa data science pozicijama...',
    'Sa tvojim matematičkim veštinama, možda bi ti odgovaralo predavanje...'
  ]
};

// Helper funkcije za mock podatke
export const getMockUserById = (id: string) => {
  return mockUsers.find(user => user._id === id);
};

export const getMockUserByEmail = (email: string) => {
  return mockUsers.find(user => user.email === email);
};

export const getMockChatsByUserId = (userId: string) => {
  return mockChats.filter(chat => chat.userId === userId);
};

export const getMockProblems = () => {
  return mockProblems;
};

export const getMockExams = () => {
  return mockExams;
};

export const getRandomAIResponse = (type: keyof typeof mockAIResponses) => {
  const responses = mockAIResponses[type];
  return responses[Math.floor(Math.random() * responses.length)];
}; 