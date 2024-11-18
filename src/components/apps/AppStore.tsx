import React from 'react';
import { Download } from 'lucide-react';

const apps = [
  {
    name: 'Photo Editor Pro',
    description: 'Professional grade photo editing tools',
    icon: '🎨',
    price: 'Free',
  },
  {
    name: 'Music Player',
    description: 'Stream and organize your music',
    icon: '🎵',
    price: 'Free',
  },
  {
    name: 'Code Editor',
    description: 'Lightweight code editor with syntax highlighting',
    icon: '💻',
    price: 'Free',
  },
  {
    name: 'Weather App',
    description: 'Real-time weather updates and forecasts',
    icon: '🌤',
    price: 'Free',
  },
];

export default function AppStore() {
  return (
    <div className="h-full">
      <div className="grid grid-cols-2 gap-4">
        {apps.map((app) => (
          <div
            key={app.name}
            className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{app.icon}</span>
                <div>
                  <h3 className="text-white font-medium">{app.name}</h3>
                  <p className="text-gray-300 text-sm">{app.description}</p>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center space-x-1">
                <Download className="w-4 h-4" />
                <span>{app.price}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}