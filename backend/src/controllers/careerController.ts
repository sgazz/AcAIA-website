import { Request, Response } from 'express';
import { aiService } from '@/services/aiService';

interface AuthRequest extends Request {
  user?: any;
}

// Generisanje karijernog saveta
export const generateCareerAdvice = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      currentSkills = [],
      interests = [],
      experience = '',
      goals = ''
    } = req.body;
    const userId = req.user._id;

    // Generisanje karijernog saveta pomoću AI-a
    const careerAdvice = await aiService.generateCareerAdvice({
      currentSkills,
      interests,
      experience,
      goals
    });

    res.json({
      success: true,
      message: 'Karijerni savet uspešno generisan.',
      data: {
        advice: careerAdvice,
        userId,
        generatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Greška pri generisanju karijernog saveta:', error);
    res.status(500).json({
      success: false,
      message: 'Greška pri generisanju karijernog saveta. Pokušajte ponovo.'
    });
  }
};

// Dobijanje karijernih putova
export const getCareerPaths = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { subject, difficulty } = req.query;

    // Predefinisani karijerni putovi
    const careerPaths = [
      {
        id: 'software-development',
        title: 'Software Development',
        description: 'Razvoj softvera i programiranje',
        subjects: ['programming', 'computer-science', 'mathematics'],
        difficulty: 'intermediate',
        estimatedDuration: '2-4 godine',
        skills: ['JavaScript', 'Python', 'Java', 'Database Design', 'System Architecture'],
        careerOptions: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer']
      },
      {
        id: 'data-science',
        title: 'Data Science',
        description: 'Analiza podataka i mašinsko učenje',
        subjects: ['statistics', 'mathematics', 'programming', 'machine-learning'],
        difficulty: 'advanced',
        estimatedDuration: '3-5 godina',
        skills: ['Python', 'R', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization'],
        careerOptions: ['Data Analyst', 'Data Scientist', 'Machine Learning Engineer', 'Business Intelligence Analyst']
      },
      {
        id: 'web-design',
        title: 'Web Design',
        description: 'Dizajn i razvoj web stranica',
        subjects: ['design', 'programming', 'user-experience'],
        difficulty: 'beginner',
        estimatedDuration: '1-2 godine',
        skills: ['HTML', 'CSS', 'JavaScript', 'UI/UX Design', 'Responsive Design'],
        careerOptions: ['Web Designer', 'UI/UX Designer', 'Frontend Developer', 'Digital Designer']
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        description: 'Sigurnost informacionih sistema',
        subjects: ['computer-science', 'networking', 'security'],
        difficulty: 'advanced',
        estimatedDuration: '3-4 godine',
        skills: ['Network Security', 'Penetration Testing', 'Security Analysis', 'Incident Response'],
        careerOptions: ['Security Analyst', 'Penetration Tester', 'Security Engineer', 'Cybersecurity Consultant']
      }
    ];

    // Filtriranje po predmetu i nivou
    let filteredPaths = careerPaths;
    if (subject) {
      filteredPaths = filteredPaths.filter(path => 
        path.subjects.includes(subject as string)
      );
    }
    if (difficulty) {
      filteredPaths = filteredPaths.filter(path => 
        path.difficulty === difficulty
      );
    }

    res.json({
      success: true,
      data: {
        careerPaths: filteredPaths,
        total: filteredPaths.length
      }
    });
  } catch (error) {
    console.error('Greška pri dobijanju karijernih putova:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
};

// Procena veština
export const assessSkills = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { skills, experience, education } = req.body;
    const userId = req.user._id;

    // Procena veština na osnovu unetih podataka
    const assessment = {
      technicalSkills: {
        programming: skills.includes('programming') ? Math.min(experience * 10, 100) : 0,
        design: skills.includes('design') ? Math.min(experience * 8, 100) : 0,
        analysis: skills.includes('analysis') ? Math.min(experience * 12, 100) : 0,
        communication: Math.min(experience * 15, 100),
        problemSolving: Math.min(experience * 20, 100)
      },
      overallScore: 0,
      recommendations: [] as string[],
      careerMatches: [] as string[]
    };

    // Izračunavanje ukupne ocene
    const skillScores = Object.values(assessment.technicalSkills);
    assessment.overallScore = skillScores.reduce((sum, score) => sum + score, 0) / skillScores.length;

    // Generisanje preporuka
    if (assessment.technicalSkills.programming > 70) {
      assessment.recommendations.push('Razmotrite karijeru u software development-u');
      assessment.careerMatches.push('Software Developer', 'Full Stack Developer');
    }
    if (assessment.technicalSkills.design > 70) {
      assessment.recommendations.push('Razmotrite karijeru u web design-u');
      assessment.careerMatches.push('Web Designer', 'UI/UX Designer');
    }
    if (assessment.technicalSkills.analysis > 70) {
      assessment.recommendations.push('Razmotrite karijeru u data science-u');
      assessment.careerMatches.push('Data Analyst', 'Data Scientist');
    }

    if (assessment.recommendations.length === 0) {
      assessment.recommendations.push('Fokusirajte se na razvoj osnovnih veština');
      assessment.recommendations.push('Počnite sa osnovama programiranja ili dizajna');
    }

    res.json({
      success: true,
      message: 'Procena veština uspešno završena.',
      data: {
        assessment,
        userId,
        assessedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Greška pri proceni veština:', error);
    res.status(500).json({
      success: false,
      message: 'Greška pri proceni veština. Pokušajte ponovo.'
    });
  }
};

// Dobijanje learning path-a
export const getLearningPath = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { careerPath, currentLevel = 'beginner' } = req.query;

    const learningPaths = {
      'software-development': {
        beginner: [
          { skill: 'HTML & CSS', duration: '2-3 meseca', priority: 'high' },
          { skill: 'JavaScript Basics', duration: '3-4 meseca', priority: 'high' },
          { skill: 'Git & Version Control', duration: '1-2 meseca', priority: 'medium' }
        ],
        intermediate: [
          { skill: 'Advanced JavaScript', duration: '4-6 meseca', priority: 'high' },
          { skill: 'React/Vue.js', duration: '3-4 meseca', priority: 'high' },
          { skill: 'Node.js & Backend', duration: '4-5 meseca', priority: 'high' }
        ],
        advanced: [
          { skill: 'System Design', duration: '6-12 meseca', priority: 'high' },
          { skill: 'DevOps & CI/CD', duration: '4-6 meseca', priority: 'medium' },
          { skill: 'Advanced Algorithms', duration: '6-8 meseca', priority: 'medium' }
        ]
      },
      'data-science': {
        beginner: [
          { skill: 'Python Basics', duration: '3-4 meseca', priority: 'high' },
          { skill: 'Statistics Fundamentals', duration: '4-5 meseca', priority: 'high' },
          { skill: 'SQL Basics', duration: '2-3 meseca', priority: 'medium' }
        ],
        intermediate: [
          { skill: 'Data Analysis with Pandas', duration: '3-4 meseca', priority: 'high' },
          { skill: 'Machine Learning Basics', duration: '6-8 meseca', priority: 'high' },
          { skill: 'Data Visualization', duration: '2-3 meseca', priority: 'medium' }
        ],
        advanced: [
          { skill: 'Deep Learning', duration: '8-12 meseca', priority: 'high' },
          { skill: 'Big Data Technologies', duration: '6-8 meseca', priority: 'medium' },
          { skill: 'MLOps', duration: '4-6 meseca', priority: 'medium' }
        ]
      }
    };

    const path = learningPaths[careerPath as keyof typeof learningPaths];
    if (!path) {
      res.status(404).json({
        success: false,
        message: 'Karijerni put nije pronađen.'
      });
      return;
    }

    const levelPath = path[currentLevel as keyof typeof path];
    if (!levelPath) {
      res.status(404).json({
        success: false,
        message: 'Nivo nije pronađen.'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        careerPath,
        currentLevel,
        learningPath: levelPath,
        estimatedTotalDuration: levelPath.reduce((sum, skill) => {
          const duration = parseInt(skill.duration.split('-')[0]);
          return sum + duration;
        }, 0)
      }
    });
  } catch (error) {
    console.error('Greška pri dobijanju learning path-a:', error);
    res.status(500).json({
      success: false,
      message: 'Greška na serveru. Pokušajte ponovo.'
    });
  }
}; 