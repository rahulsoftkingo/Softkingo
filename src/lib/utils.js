// src/lib/utils.js
export function cn(...inputs) {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ');
}