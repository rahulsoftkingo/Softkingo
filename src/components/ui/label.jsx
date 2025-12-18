// src/components/ui/label.jsx
import React from 'react';

/**
 * A label for form inputs.
 */
export function Label({ htmlFor, children, className = '', ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}