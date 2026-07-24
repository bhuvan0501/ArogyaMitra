import { FiCpu, FiUser } from "react-icons/fi";

export function ChatBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser ? <Avatar icon={FiCpu} tone="brand" /> : null}
      <article
        className={`max-w-[min(100%,44rem)] rounded-lg px-4 py-3 shadow-sm backdrop-blur-md ${
          isUser ? "bg-brand-600 text-white" : "border border-white/70 bg-white/80 text-slate-800 dark:border-slate-800 dark:bg-slate-900/80"
        }`}
      >
        <div className={`whitespace-pre-wrap text-sm leading-6 ${isUser ? "text-white" : "text-slate-700 dark:text-slate-200"}`}>
          {message.content}
        </div>
      </article>
      {isUser ? <Avatar icon={FiUser} tone="slate" /> : null}
    </div>
  );
}

function Avatar({ icon: Icon, tone }) {
  const className = tone === "brand" ? "bg-brand-50 text-brand-700 dark:bg-brand-900/50 dark:text-brand-100" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200";

  return (
    <div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${className}`}>
      <Icon className="h-5 w-5" aria-hidden="true" />
    </div>
  );
}
