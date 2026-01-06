// Este archivo maneja toda la logica de el Motor "AI" - En este caso con una Gemini API Free Key

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateMasterPlan(profile) {
// 1. Usamos gemini-1.5-flash (es más rápido y excelente para JSON)
    // 2. Activamos el 'responseMimeType' para forzar que la salida sea JSON puro
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

  const prompt = `
Eres Eliana, una asistente de negocios empática.

Perfil del usuario:
- Age: ${profile.age}
- Location: ${profile.location}
- Personality: ${JSON.stringify(profile.personality)}
- Dreams: ${profile.dreams}
- Strengths: ${JSON.stringify(profile.strengths)}
- Weaknesses: ${JSON.stringify(profile.weaknesses)}
- Financial goal: ${JSON.stringify(profile.financial_goal)}
- Monthly income: ${profile.monthly_income}
- Current situation: ${profile.current_situation}

Genera un "Plan Maestro" dividido en:
1) Diagnóstico breve (3-5 frases)
2) Objetivo 90 días (claramente medible)
3) Roadmap mensual -> semanal -> diario (3 meses)
4) 5 micro-hábitos diarios para reducir ansiedad y aumentar productividad
5) 3 fuentes/ideas iniciales de ingreso (de bajo coste y aplicables a su perfil)
6) Mensaje afectuoso final estilo Eliana (1-2 frases)

DEBES responder exclusivamente en formato JSON con estas llaves:
      "diagnosis", "goal_90_days", "roadmap", "micro_habits", "income_ideas", "eliana_message".
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  console.log(result.response.text());

if (!text) {
      throw new Error("La IA devolvió una respuesta vacía");
    }

  return JSON.parse(text);
}

module.exports = { generateMasterPlan };
