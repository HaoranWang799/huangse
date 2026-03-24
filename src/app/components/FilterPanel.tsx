import { type ReactNode } from 'react';

interface FilterPanelProps {
  isOpen: boolean;
  children: ReactNode;
}

export function FilterPanel({ isOpen, children }: FilterPanelProps) {
  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        maxHeight: isOpen ? '600px' : '0px',
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className="pt-1 pb-2">
        {children}
      </div>
    </div>
  );
}
