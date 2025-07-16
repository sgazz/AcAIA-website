import OpenAI from 'openai';

class AIService {
  private openai: OpenAI | null = null;
  private isMockMode: boolean = false;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (apiKey && apiKey !== 'your-openai-api-key' && apiKey !== 'sk-mock-key-for-development') {
      this.openai = new OpenAI({
        apiKey: apiKey,
      });
      this.isMockMode = false;
    } else {
      console.log('🤖 AI Service running in MOCK mode (no OpenAI API key provided)');
      this.isMockMode = true;
    }
  }

  // Generisanje AI odgovora za chat
  async generateChatResponse(
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
    context?: {
      subject?: string;
      difficulty?: string;
      learningObjective?: string;
    }
  ): Promise<{ content: string; tokens: number }> {
    if (this.isMockMode) {
      return this.generateMockChatResponse(messages, context);
    }

    try {
      if (!this.openai) {
        throw new Error('OpenAI client not initialized');
      }

      const systemPrompt = this.buildSystemPrompt(context);
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 1000,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      const content = response.choices[0]?.message?.content || 'Izvinite, ne mogu da generišem odgovor trenutno.';
      const tokens = response.usage?.total_tokens || 0;

      return { content, tokens };
    } catch (error) {
      console.error('Greška pri generisanju AI odgovora:', error);
      throw new Error('Greška pri komunikaciji sa AI servisom');
    }
  }

  private generateMockChatResponse(
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
    context?: {
      subject?: string;
      difficulty?: string;
      learningObjective?: string;
    }
  ): { content: string; tokens: number } {
    const mockResponses = [
      "Odlično pitanje! Evo kako možete da rešite ovaj problem...",
      "Da, to je tačno! Hajde da detaljnije razmotrimo ovu temu.",
      "Interesantno pitanje. Evo nekoliko koraka koje možete preduzeti...",
      "Slažem se sa vašim pristupom. Dodatno možete razmotriti...",
      "To je odličan početak! Sada možemo da nastavimo sa...",
      "Evo kako možete da primenite ovo u praksi...",
      "Odlično razmišljanje! Dodatno možete da istražite...",
      "Da, to je pravi pristup. Sada možemo da dodamo...",
      "Interesantna perspektiva! Evo kako možete da je razvijete...",
      "Slažem se! Ovo je korak u pravom smeru. Sada možemo..."
    ];

    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    return { content: randomResponse, tokens: 50 };
  }

  // Generisanje problema
  async generateProblem(params: {
    subject: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    type: 'multiple-choice' | 'open-ended' | 'coding' | 'essay';
    learningObjectives: string[];
  }): Promise<{
    title: string;
    description: string;
    question: string;
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
    hints: string[];
    estimatedTime: number;
  }> {
    if (this.isMockMode) {
      return this.generateMockProblem(params);
    }

    try {
      if (!this.openai) {
        throw new Error('OpenAI client not initialized');
      }

      const prompt = this.buildProblemGenerationPrompt(params);
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Ti si ekspert za kreiranje edukativnih problema. Generiši problem u JSON formatu.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.8,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('AI nije generisao odgovor');
      }

      // Pokušaj da parsiraš JSON odgovor
      try {
        const problemData = JSON.parse(content);
        return {
          title: problemData.title,
          description: problemData.description,
          question: problemData.question,
          options: problemData.options,
          correctAnswer: problemData.correctAnswer,
          explanation: problemData.explanation,
          hints: problemData.hints || [],
          estimatedTime: problemData.estimatedTime || 15
        };
      } catch (parseError) {
        console.error('Greška pri parsiranju AI odgovora:', parseError);
        throw new Error('Greška pri obradi AI odgovora');
      }
    } catch (error) {
      console.error('Greška pri generisanju problema:', error);
      throw new Error('Greška pri generisanju problema');
    }
  }

  private generateMockProblem(params: {
    subject: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    type: 'multiple-choice' | 'open-ended' | 'coding' | 'essay';
    learningObjectives: string[];
  }): {
    title: string;
    description: string;
    question: string;
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
    hints: string[];
    estimatedTime: number;
  } {
    const mockProblems = {
      'multiple-choice': {
        title: `Osnovni problem iz ${params.subject}`,
        description: `Edukativni problem za ${params.difficulty} nivo`,
        question: `Koji je osnovni koncept u oblasti ${params.subject}?`,
        options: ['Opcija A', 'Opcija B', 'Opcija C', 'Opcija D'],
        correctAnswer: 'Opcija A',
        explanation: 'Opcija A je tačna jer predstavlja osnovni koncept.',
        hints: ['Razmislite o osnovnim principima', 'Pogledajte definicije'],
        estimatedTime: 10
      },
      'open-ended': {
        title: `Analitički problem iz ${params.subject}`,
        description: `Problem koji zahteva analizu za ${params.difficulty} nivo`,
        question: `Objasnite kako funkcioniše ${params.subject} u praksi.`,
        correctAnswer: 'Očekuje se detaljno objašnjenje.',
        explanation: 'Ovo pitanje testira razumevanje koncepta.',
        hints: ['Koristite konkretne primere', 'Povežite teoriju i praksu'],
        estimatedTime: 15
      }
    };

    const problemType = params.type === 'coding' || params.type === 'essay' ? 'open-ended' : params.type;
    return mockProblems[problemType as keyof typeof mockProblems];
  }

  // Generisanje simulacije ispita
  async generateExamSimulation(params: {
    subject: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    numberOfQuestions: number;
    duration: number; // u minutima
  }): Promise<{
    title: string;
    description: string;
    questions: Array<{
      question: string;
      type: 'multiple-choice' | 'open-ended';
      options?: string[];
      correctAnswer?: string;
      points: number;
    }>;
    totalPoints: number;
    estimatedDuration: number;
  }> {
    if (this.isMockMode) {
      return this.generateMockExamSimulation(params);
    }

    try {
      if (!this.openai) {
        throw new Error('OpenAI client not initialized');
      }

      const prompt = this.buildExamSimulationPrompt(params);
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Ti si ekspert za kreiranje simulacija ispita. Generiši ispit u JSON formatu.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 3000,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('AI nije generisao odgovor');
      }

      try {
        const examData = JSON.parse(content);
        return {
          title: examData.title,
          description: examData.description,
          questions: examData.questions,
          totalPoints: examData.totalPoints,
          estimatedDuration: examData.estimatedDuration
        };
      } catch (parseError) {
        console.error('Greška pri parsiranju AI odgovora:', parseError);
        throw new Error('Greška pri obradi AI odgovora');
      }
    } catch (error) {
      console.error('Greška pri generisanju simulacije ispita:', error);
      throw new Error('Greška pri generisanju simulacije ispita');
    }
  }

  private generateMockExamSimulation(params: {
    subject: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    numberOfQuestions: number;
    duration: number;
  }): {
    title: string;
    description: string;
    questions: Array<{
      question: string;
      type: 'multiple-choice' | 'open-ended';
      options?: string[];
      correctAnswer?: string;
      points: number;
    }>;
    totalPoints: number;
    estimatedDuration: number;
  } {
    const questions = [];
    const pointsPerQuestion = Math.floor(100 / params.numberOfQuestions);

    for (let i = 1; i <= params.numberOfQuestions; i++) {
      questions.push({
        question: `Pitanje ${i}: Osnovni koncept iz ${params.subject}`,
        type: 'multiple-choice' as const,
        options: ['Opcija A', 'Opcija B', 'Opcija C', 'Opcija D'],
        correctAnswer: 'Opcija A',
        points: pointsPerQuestion
      });
    }

    return {
      title: `Simulacija ispita iz ${params.subject}`,
      description: `Ispit za ${params.difficulty} nivo sa ${params.numberOfQuestions} pitanja`,
      questions,
      totalPoints: 100,
      estimatedDuration: params.duration
    };
  }

  // Generisanje karijernog saveta
  async generateCareerAdvice(params: {
    currentSkills: string[];
    interests: string[];
    experience: string;
    goals: string;
  }): Promise<{
    analysis: string;
    recommendations: string[];
    learningPath: Array<{
      skill: string;
      priority: 'high' | 'medium' | 'low';
      estimatedTime: string;
      resources: string[];
    }>;
    nextSteps: string[];
  }> {
    if (this.isMockMode) {
      return this.generateMockCareerAdvice(params);
    }

    try {
      if (!this.openai) {
        throw new Error('OpenAI client not initialized');
      }

      const prompt = this.buildCareerAdvicePrompt(params);
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Ti si karijerni savetnik. Daj personalizovane savete u JSON formatu.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2500,
        temperature: 0.8,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('AI nije generisao odgovor');
      }

      try {
        const adviceData = JSON.parse(content);
        return {
          analysis: adviceData.analysis,
          recommendations: adviceData.recommendations,
          learningPath: adviceData.learningPath,
          nextSteps: adviceData.nextSteps
        };
      } catch (parseError) {
        console.error('Greška pri parsiranju AI odgovora:', parseError);
        throw new Error('Greška pri obradi AI odgovora');
      }
    } catch (error) {
      console.error('Greška pri generisanju karijernog saveta:', error);
      throw new Error('Greška pri generisanju karijernog saveta');
    }
  }

  private generateMockCareerAdvice(params: {
    currentSkills: string[];
    interests: string[];
    experience: string;
    goals: string;
  }): {
    analysis: string;
    recommendations: string[];
    learningPath: Array<{
      skill: string;
      priority: 'high' | 'medium' | 'low';
      estimatedTime: string;
      resources: string[];
    }>;
    nextSteps: string[];
  } {
    return {
      analysis: `Na osnovu vaših veština (${params.currentSkills.join(', ')}) i interesa (${params.interests.join(', ')}), vidim da imate solidnu osnovu. Vaše iskustvo u ${params.experience} je odličan početak za postizanje cilja: ${params.goals}.`,
      recommendations: [
        'Nastavite sa razvojem postojećih veština',
        'Istražite nove oblasti koje vas interesuju',
        'Povežite se sa profesionalcima iz vaše oblasti'
      ],
      learningPath: [
        {
          skill: 'Napredne veštine',
          priority: 'high' as const,
          estimatedTime: '3-6 meseci',
          resources: ['Online kursevi', 'Praktični projekti', 'Mentorstvo']
        },
        {
          skill: 'Soft skills',
          priority: 'medium' as const,
          estimatedTime: '6-12 meseci',
          resources: ['Komunikacioni kursevi', 'Timski projekti', 'Volontiranje']
        }
      ],
      nextSteps: [
        'Kreirajte plan učenja',
        'Postavite kratkoročne ciljeve',
        'Pratite napredak'
      ]
    };
  }

  private buildSystemPrompt(context?: {
    subject?: string;
    difficulty?: string;
    learningObjective?: string;
  }): string {
    let prompt = `Ti si AcAIA - inteligentni AI asistent za učenje i razvoj. 
    Tvoj cilj je da pomogneš korisnicima da efikasno uče i razvijaju svoje veštine.
    
    Osnovna pravila:
    - Odgovaraj na srpskom jeziku
    - Budi strpljiv i objašnjavaj korak po korak
    - Prilagodi se nivou korisnika
    - Daj praktične primere
    - Ohrabri korisnika da nastavi sa učenjem`;

    if (context?.subject) {
      prompt += `\nPredmet: ${context.subject}`;
    }
    if (context?.difficulty) {
      prompt += `\nNivo: ${context.difficulty}`;
    }
    if (context?.learningObjective) {
      prompt += `\nCilj učenja: ${context.learningObjective}`;
    }

    return prompt;
  }

  private buildProblemGenerationPrompt(params: {
    subject: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    type: 'multiple-choice' | 'open-ended' | 'coding' | 'essay';
    learningObjectives: string[];
  }): string {
    return `Generiši edukativni problem sa sledećim parametrima:
    - Predmet: ${params.subject}
    - Nivo: ${params.difficulty}
    - Tip: ${params.type}
    - Ciljevi učenja: ${params.learningObjectives.join(', ')}
    
    Odgovor mora biti u JSON formatu sa sledećim poljima:
    {
      "title": "Naslov problema",
      "description": "Opis problema",
      "question": "Pitanje",
      "options": ["opcija1", "opcija2", "opcija3", "opcija4"], // samo za multiple-choice
      "correctAnswer": "tačan odgovor",
      "explanation": "Objašnjenje rešenja",
      "hints": ["savet1", "savet2"],
      "estimatedTime": 15
    }`;
  }

  private buildExamSimulationPrompt(params: {
    subject: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    numberOfQuestions: number;
    duration: number;
  }): string {
    return `Generiši simulaciju ispita sa sledećim parametrima:
    - Predmet: ${params.subject}
    - Nivo: ${params.difficulty}
    - Broj pitanja: ${params.numberOfQuestions}
    - Trajanje: ${params.duration} minuta
    
    Odgovor mora biti u JSON formatu sa sledećim poljima:
    {
      "title": "Naslov ispita",
      "description": "Opis ispita",
      "questions": [
        {
          "question": "Pitanje",
          "type": "multiple-choice",
          "options": ["opcija1", "opcija2", "opcija3", "opcija4"],
          "correctAnswer": "tačan odgovor",
          "points": 10
        }
      ],
      "totalPoints": 100,
      "estimatedDuration": 60
    }`;
  }

  private buildCareerAdvicePrompt(params: {
    currentSkills: string[];
    interests: string[];
    experience: string;
    goals: string;
  }): string {
    return `Analiziraj karijerni profil i daj savete:
    - Trenutne veštine: ${params.currentSkills.join(', ')}
    - Interesi: ${params.interests.join(', ')}
    - Iskustvo: ${params.experience}
    - Ciljevi: ${params.goals}
    
    Odgovor mora biti u JSON formatu sa sledećim poljima:
    {
      "analysis": "Analiza trenutne situacije",
      "recommendations": ["preporuka1", "preporuka2"],
      "learningPath": [
        {
          "skill": "veština",
          "priority": "high",
          "estimatedTime": "3-6 meseci",
          "resources": ["resurs1", "resurs2"]
        }
      ],
      "nextSteps": ["korak1", "korak2"]
    }`;
  }
}

export const aiService = new AIService(); 