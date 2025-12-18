// src/components/ui/sonner.jsx
"use client"

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export const toast = {
  success: (message) => addToast(message, 'success'),
  error: (message) => addToast(message, 'error'),
  info: (message) => addToast(message, 'info'),
  warning: (message) => addToast(message, 'warning'),
};

let toastId = 0;
const toasts = new Map();
const listeners = new Set();

function addToast(message, type) {
  const id = toastId++;
  toasts.set(id, { id, message, type });
  notify();
  return id;
}

function removeToast(id) {
  toasts.delete(id);
  notify();
}

function notify() {
  listeners.forEach(listener => listener([...toasts.values()]));
}

function useToasts() {
  const [toastsList, setToastsList] = useState([]);
  
  useEffect(() => {
    const listener = (newToasts) => setToastsList(newToasts);
    listeners.add(listener);
    listener([...toasts.values()]);
    
    return () => {
      listeners.delete(listener);
    };
  }, []);
  
  return toastsList;
}

const ToastIcons = {
  success: <CheckCircle className="h-5 w-5 text-sky-600" />,
  error: <XCircle className="h-5 w-5 text-red-600" />,
  info: <Info className="h-5 w-5 text-blue-600" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
};

const ToastBgColors = {
  success: "bg-sky-50 border-sky-200",
  error: "bg-red-50 border-red-200",
  info: "bg-blue-50 border-blue-200",
  warning: "bg-yellow-50 border-yellow-200",
};

const ToastTextColors = {
  success: "text-sky-800",
  error: "text-red-800",
  info: "text-blue-800",
  warning: "text-yellow-800",
};

export function Toaster({ position = "top-right", duration = 5000 }) {
  const toasts = useToasts();
  const [visibleToasts, setVisibleToasts] = useState([]);

  useEffect(() => {
    setVisibleToasts(toasts);
    
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        removeToast(toasts[0].id);
      }
    }, duration);
    
    return () => clearTimeout(timer);
  }, [toasts, duration]);

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  if (visibleToasts.length === 0) return null;

  return (
    <div className={`fixed z-50 space-y-3 ${positionClasses[position]}`}>
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className={`${ToastBgColors[toast.type]} ${ToastTextColors[toast.type]} border rounded-lg shadow-lg p-4 min-w-[300px] flex items-start transition-all duration-300 animate-fadeIn`}
        >
          <div className="mr-3 mt-0.5">{ToastIcons[toast.type]}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}