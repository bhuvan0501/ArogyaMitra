import { useEffect, useRef, useState } from "react";
import { FiSend, FiTrash2 } from "react-icons/fi";
import { ChatBubble } from "../../components/chat/ChatBubble.jsx";
import { PromptChip } from "../../components/chat/PromptChip.jsx";
import { PageHeader } from "../../components/common/PageHeader.jsx";
import { LoadingSpinner } from "../../components/common/LoadingSpinner.jsx";
import { aiService } from "../../services/aiService.js";

const starterPrompts = [
  "Adjust my workout for knee discomfort",
  "I only have 20 minutes today",
  "Help me train while traveling",
  "Motivate me to stay consistent"
];

export function AiCoachPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await aiService.getCoachHistory();
        setMessages(response.data);
      } catch {
        setError("Unable to load AROMI chat history.");
      } finally {
        setIsLoading(false);
      }
    }

    loadHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) {
      return;
    }

    const optimisticMessage = {
      id: `local-${Date.now()}`,
      role: "user",
      content: trimmed,
      created_at: new Date().toISOString()
    };

    setMessages((current) => [...current, optimisticMessage]);
    setInput("");
    setError("");
    setIsSending(true);

    try {
      const response = await aiService.createCoachResponse({ message: trimmed });
      setMessages(response.data.history);
    } catch (requestError) {
      setError(requestError.response?.data?.detail || "AROMI could not respond right now.");
    } finally {
      setIsSending(false);
    }
  };

  const handleClear = async () => {
    setError("");
    try {
      await aiService.clearCoachHistory();
      setMessages([]);
    } catch {
      setError("Unable to clear chat history.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <PageHeader title="AROMI AI Coach" description="Ask about workouts, adjustments, time constraints, travel, and motivation." />
        <button
          type="button"
          onClick={handleClear}
          className="btn-secondary inline-flex items-center gap-2"
        >
          <FiTrash2 aria-hidden="true" />
          Clear Chat
        </button>
      </div>

      <section className="glass-card overflow-hidden">
        <div className="border-b border-white/70 bg-white/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/30">
          <p className="text-sm font-semibold text-slate-950 dark:text-white">Chat with AROMI</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Responses are markdown-formatted and personalized with your health profile.</p>
        </div>

        <div className="h-[32rem] space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
          {isLoading ? <LoadingSpinner label="Loading chat history" /> : null}

          {!isLoading && messages.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-6 dark:border-slate-700 dark:bg-slate-900/60">
              <h2 className="text-base font-semibold text-slate-950 dark:text-white">What should AROMI help with today?</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {starterPrompts.map((prompt) => (
                  <PromptChip key={prompt} onClick={() => setInput(prompt)}>
                    {prompt}
                  </PromptChip>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}

          {isSending ? (
            <div className="flex justify-start">
              <div className="rounded-lg border border-white/70 bg-white/80 px-4 py-3 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                AROMI is thinking...
              </div>
            </div>
          ) : null}
          <div ref={bottomRef} />
        </div>

        {error ? <div className="border-t border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</div> : null}

        <form className="flex flex-col gap-3 border-t border-white/70 bg-white/50 p-4 dark:border-slate-800 dark:bg-slate-950/30 sm:flex-row" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask AROMI about workouts, injuries, travel, time limits, or motivation..."
            className="field-input min-h-24 flex-1 resize-none sm:min-h-12"
            maxLength={2000}
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <FiSend aria-hidden="true" />
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
