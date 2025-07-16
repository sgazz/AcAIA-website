"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiService = void 0;
const openai_1 = __importDefault(require("openai"));
class AIService {
    constructor() {
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async generateChatResponse(messages, context) {
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
        }
        catch (error) {
            console.error('Greška pri generisanju AI odgovora:', error);
            throw new Error('Greška pri komunikaciji sa AI servisom');
        }
    }
    async generateProblem(params) {
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
            }
            catch (parseError) {
                console.error('Greška pri parsiranju AI odgovora:', parseError);
                throw new Error('Greška pri obradi AI odgovora');
            }
        }
        catch (error) {
            console.error('Greška pri generisanju problema:', error);
            throw new Error('Greška pri generisanju problema');
        }
    }
    async generateExamSimulation(params) {
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
            }
            catch (parseError) {
                console.error('Greška pri parsiranju AI odgovora:', parseError);
                throw new Error('Greška pri obradi AI odgovora');
            }
        }
        catch (error) {
            console.error('Greška pri generisanju simulacije ispita:', error);
            throw new Error('Greška pri generisanju simulacije ispita');
        }
    }
    async generateCareerAdvice(params) {
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
            }
            catch (parseError) {
                console.error('Greška pri parsiranju AI odgovora:', parseError);
                throw new Error('Greška pri obradi AI odgovora');
            }
        }
        catch (error) {
            console.error('Greška pri generisanju karijernog saveta:', error);
            throw new Error('Greška pri generisanju karijernog saveta');
        }
    }
    buildSystemPrompt(context) {
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
    buildProblemGenerationPrompt(params) {
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
    buildExamSimulationPrompt(params) {
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
    buildCareerAdvicePrompt(params) {
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
exports.aiService = new AIService();
//# sourceMappingURL=aiService.js.map