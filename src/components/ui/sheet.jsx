// src/components/ui/sheet.jsx
"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';

const SheetContext = createContext();

export function Sheet({ children, open: controlledOpen, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const open = controlledOpen !== undefined ? controlledOpen : isOpen;
  const setOpen = onOpenChange || setIsOpen;

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children, asChild = false, className = "" }) {
  const { setOpen } = useContext(SheetContext);
  const trigger = asChild ? children : <button>{children}</button>;

  return React.cloneElement(trigger, {
    onClick: () => setOpen(true),
    className: `cursor-pointer ${className}`.trim()
  });
}


export function SheetContent({ 
  children, 
  side = "left", 
  className = "",
  onCloseAutoFocus,
  onEscapeKeyDown
}) {
  const { open, setOpen } = useContext(SheetContext);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onEscapeKeyDown?.(e);
        setOpen(false);
      }
    };
    
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen, onEscapeKeyDown]);

  if (!open) return null;

  const positionClasses = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full"
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black opacity-40 z-40"
        onClick={() => setOpen(false)}
      />
      
      <div 
        className={`fixed z-50 bg-white dark:bg-gray-800 shadow-lg ${positionClasses[side]} ${className}`}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        {children}
      </div>
    </>
  );
}