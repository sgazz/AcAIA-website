import OpenAI from 'openai';

class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
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
    try {
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
    try {
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
    try {
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
    try {
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