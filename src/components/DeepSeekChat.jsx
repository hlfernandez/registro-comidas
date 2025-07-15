import { useState } from "react";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(import.meta.env.VITE_HF_TOKEN);
const OPTS = {
  model: "deepseek-ai/DeepSeek-R1",
  provider: "together",
  max_tokens: 256,
  temperature: 0.7,
};

export default function DeepSeekChat() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);

  async function run(e) {
    e.preventDefault();
    setBusy(true);
    setAnswer("");
    try {
      const res = await hf.chatCompletion({
        ...OPTS,
        messages: [{ role: "user", content: prompt }],
      });
      setAnswer(res.choices[0].message.content);
    } catch (error) {
      setAnswer("Error: " + error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={run}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border rounded w-full p-2"
          rows={4}
          placeholder="Ask DeepSeek‑R1 something…"
        />
        <button
          disabled={busy}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {busy ? "Thinking…" : "Send"}
        </button>
      </form>
      {answer && <pre className="whitespace-pre-wrap">{answer}</pre>}
    </div>
  );
}
