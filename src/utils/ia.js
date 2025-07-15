// Utilidades para sugerencias IA
import { HfInference } from '@huggingface/inference';

export async function complete(prompt, hfApiKey) {
  const client = new HfInference(hfApiKey);
  const res = await client.chatCompletion({
    model: 'deepseek-ai/DeepSeek-V3', // Cambiar al modelo DeepSeek-V3
    provider: 'together',
    max_tokens: 256,
    temperature: 0.7,
    messages: [{ role: 'user', content: prompt }],
  });
  return res.choices[0].message.content;
}

export async function getIASuggestions({ historial, openAIApiKey, hfApiKey, limit = 3 }) {
  // Prioridad: OpenAI > Hugging Face > []
  if (openAIApiKey) {
    try {
      const prompt = `Sugiere ${limit} comidas diferentes para el usuario, basadas en este historial de comidas recientes (nombre y franja):\n` +
        historial.map(c => `- ${c.name} (${c.type})`).join('\n') +
        '\nNo repitas comidas recientes. Devuelve las sugerencias en un array en formato JSON.'; // Instrucción para formato JSON
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 100
        })
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || '';
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']') + 1;
      const suggestions = JSON.parse(text.slice(jsonStart, jsonEnd)); // Extraer el array JSON correctamente
      return suggestions.slice(0, limit); // Extraer las tres primeras sugerencias
    } catch (e) { /* fallback */ }
  }
  if (hfApiKey) {
    try {
      const prompt = `Sugiere ${limit} comidas diferentes para el usuario, basadas en este historial de comidas recientes (nombre y franja):\n` +
        historial.map(c => `- ${c.name} (${c.type})`).join('\n') +
        '\nNo repitas comidas recientes. Devuelve las sugerencias en un array en formato JSON que contenga únicamente un array con los tres valores, sin ninguna clave.'; // Instrucción para formato JSON
      const text = await complete(prompt, hfApiKey);
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']') + 1;
      const suggestions = JSON.parse(text.slice(jsonStart, jsonEnd)); // Extraer el array JSON correctamente
      return suggestions.slice(0, limit); // Extraer las tres primeras sugerencias
    } catch (e) { /* fallback */ }
  }
  return [];
}
