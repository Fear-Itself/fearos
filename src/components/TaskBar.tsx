import React from 'react';
import type { App } from './Desktop';

type Props = {
  apps: App[];
  onAppClick: (id: string) => void;
};

export default function TaskBar({ apps, onAppClick }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-amber-900 border-t border-amber-800 flex items-center px-4">
      {apps.map(app => (
        <button
          key={app.id}
          onClick={() => onAppClick(app.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded ${
            app.isOpen ? 'bg-amber-800' : 'hover:bg-amber-800/50'
          }`}
        >
          {app.icon}
          <span className="text-amber-100 text-sm">{app.title}</span>
        </button>
      ))}
    </div>
  );
}