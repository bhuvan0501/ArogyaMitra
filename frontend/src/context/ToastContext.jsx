import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { FiCheckCircle, FiInfo, FiX, FiXCircle } from "react-icons/fi";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = "info") => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => removeToast(id), 3600);
  }, [removeToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm space-y-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}

function Toast({ toast, onClose }) {
  const Icon = toast.type === "error" ? FiXCircle : toast.type === "success" ? FiCheckCircle : FiInfo;
  const tone = toast.type === "error" ? "text-red-600" : toast.type === "success" ? "text-brand-600" : "text-blue-600";

  return (
    <div className="glass-card flex animate-slide-up items-start gap-3 p-4">
      <Icon className={`mt-0.5 h-5 w-5 ${tone}`} aria-hidden="true" />
      <p className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">{toast.message}</p>
      <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-100">
        <FiX aria-hidden="true" />
      </button>
    </div>
  );
}
