import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize } from 'lucide-react';

type Props = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  position: { x: number; y: number };
  onClose: () => void;
  onMove: (position: { x: number; y: number }) => void;
};

export default function Window({ title, icon, children, position, onClose, onMove }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      onMove({
        x: dragRef.current.startPosX + dx,
        y: dragRef.current.startPosY + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onMove]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-amber-900 rounded-lg shadow-xl overflow-hidden ${
        isMaximized ? 'w-full h-full left-0 top-0' : 'w-[800px] h-[600px]'
      }`}
      style={isMaximized ? undefined : { left: position.x, top: position.y }}
    >
      <div
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between px-4 py-2 bg-amber-800 cursor-move"
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-amber-100 font-medium">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-amber-700 rounded">
            <Minus className="w-4 h-4 text-amber-100" />
          </button>
          <button className="p-1 hover:bg-amber-700 rounded" onClick={toggleMaximize}>
            <Maximize className="w-4 h-4 text-amber-100" />
          </button>
          <button className="p-1 hover:bg-red-500 rounded" onClick={onClose}>
            <X className="w-4 h-4 text-amber-100" />
          </button>
        </div>
      </div>
      <div className="p-4 h-[calc(100%-3rem)] overflow-auto bg-amber-950">
        {children}
      </div>
    </div>
  );
}