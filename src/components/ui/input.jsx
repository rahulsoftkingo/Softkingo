// src/components/ui/input.jsx
import React from 'react';

/**
 * A styled input component.
 */
export const Input = React.forwardRef(({ className = '', ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-sky-400 ${className}`}
    {...props}
  />
));
Input.displayName = 'Input';


