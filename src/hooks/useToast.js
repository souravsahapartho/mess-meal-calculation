import { useState, useCallback } from 'react';

let globalAddToast = null;

export const toast = {
  success: (msg, duration = 3500) => globalAddToast?.(msg, 'success', duration),
  error: (msg, duration = 4500) => globalAddToast?.(msg, 'error', duration),
  warning: (msg, duration = 4000) => globalAddToast?.(msg, 'warning', duration),
  info: (msg, duration = 3500) => globalAddToast?.(msg, 'info', duration),
};

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  globalAddToast = addToast;

  return { toasts, addToast, removeToast };
};
