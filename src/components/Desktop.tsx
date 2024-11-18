import React, { useState } from 'react';
import { Globe, FolderOpen, Terminal, Store, Github, Briefcase } from 'lucide-react';
import Window from './Window';
import TaskBar from './TaskBar';
import FileManager from './apps/FileManager';
import WebBrowser from './apps/WebBrowser';
import TerminalApp from './apps/Terminal';
import AppStore from './apps/AppStore';

export type App = {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  isOpen: boolean;
  position: { x: number; y: number };
};

export default function Desktop() {
  const [apps, setApps] = useState<App[]>([
    {
      id: 'browser',
      title: 'Browser',
      icon: <Globe className="w-6 h-6 stroke-amber-100" strokeWidth={1.5} />,
      component: <WebBrowser />,
      isOpen: false,
      position: { x: 50, y: 50 },
    },
    {
      id: 'files',
      title: 'Files',
      icon: <FolderOpen className="w-6 h-6 stroke-amber-100" strokeWidth={1.5} />,
      component: <FileManager />,
      isOpen: false,
      position: { x: 80, y: 80 },
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: <Terminal className="w-6 h-6 stroke-amber-100" strokeWidth={1.5} />,
      component: <TerminalApp />,
      isOpen: false,
      position: { x: 110, y: 110 },
    },
    {
      id: 'store',
      title: 'App Store',
      icon: <Store className="w-6 h-6 stroke-amber-100" strokeWidth={1.5} />,
      component: <AppStore />,
      isOpen: false,
      position: { x: 140, y: 140 },
    },
    {
      id: 'github',
      title: 'GitHub',
      icon: <Github className="w-6 h-6 stroke-amber-100" strokeWidth={1.5} />,
      component: null,
      isOpen: false,
      position: { x: 170, y: 170 },
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      icon: <Briefcase className="w-6 h-6 stroke-amber-100" strokeWidth={1.5} />,
      component: null,
      isOpen: false,
      position: { x: 200, y: 200 },
    },
  ]);

  const toggleApp = (id: string) => {
    if (id === 'github') {
      window.open('https://github.com/fear-itself', '_blank');
      return;
    }
    if (id === 'portfolio') {
      window.open('https://fearitself.netlify.app/', '_blank');
      return;
    }
    setApps(apps.map(app => 
      app.id === id ? { ...app, isOpen: !app.isOpen } : app
    ));
  };

  const moveWindow = (id: string, position: { x: number; y: number }) => {
    setApps(apps.map(app =>
      app.id === id ? { ...app, position } : app
    ));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-amber-950 to-amber-900 overflow-hidden">
      <div 
        className="grid grid-cols-6 gap-4 p-4"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 70%)'
        }}
      >
        {apps.map((app, index) => (
          <button
            key={app.id}
            onClick={() => toggleApp(app.id)}
            className="group flex flex-col items-center p-2 rounded-lg transition-all duration-300"
            style={{ 
              animation: `fadeIn 0.3s ease-out forwards`,
              animationDelay: `${index * 0.1}s`,
              opacity: 0
            }}
          >
            <div className="app-icon">
              {app.icon}
            </div>
            <span className="text-amber-100 text-sm mt-2 font-medium tracking-wide group-hover:text-amber-200 transition-colors">
              {app.title}
            </span>
          </button>
        ))}
      </div>

      {apps.map(app => app.isOpen && app.component && (
        <Window
          key={app.id}
          title={app.title}
          icon={app.icon}
          position={app.position}
          onClose={() => toggleApp(app.id)}
          onMove={(pos) => moveWindow(app.id, pos)}
        >
          {app.component}
        </Window>
      ))}

      <TaskBar apps={apps} onAppClick={toggleApp} />
    </div>
  );
}