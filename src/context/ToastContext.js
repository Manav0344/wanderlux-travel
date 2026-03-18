import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: '5rem',
          right: '1.5rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            style={{
              background: toast.type === 'success' ? '#C9A96E' : toast.type === 'error' ? '#E87070' : '#5B9BD5',
              color: '#0D0D0D',
              padding: '12px 20px',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              minWidth: '240px',
              maxWidth: '320px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
              animation: 'slideInToast 0.3s ease forwards',
              pointerEvents: 'auto',
              cursor: 'pointer',
            }}
            onClick={() => removeToast(toast.id)}
          >
            <i className={`fas fa-${toast.type === 'success' ? 'check-circle' : toast.type === 'error' ? 'times-circle' : 'info-circle'}`}></i>
            {toast.message}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideInToast {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
