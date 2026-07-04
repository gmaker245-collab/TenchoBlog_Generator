import React, { useEffect, useState } from 'react';

interface Props {
  message: string;
  type: 'success' | 'error' | null;
  onClose: () => void;
}

export const Toast: React.FC<Props> = ({ message, type, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // transition duration
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message && !show) return null;

  return (
    <div className={`toast ${type} ${show ? 'show' : ''}`}>
      <span className="toast-icon">{type === 'success' ? '✅' : '❌'}</span>
      <span>{message}</span>
    </div>
  );
};
