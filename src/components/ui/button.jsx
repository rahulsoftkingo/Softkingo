// src/components/ui/button.jsx
"use client";
import React from 'react';


export function Button({ children, variant = 'default', className = '', ...props }) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-sky-400 text-white hover:bg-sky-700 focus:ring-sky-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}



