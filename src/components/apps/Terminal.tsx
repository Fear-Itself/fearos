import React, { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState<string[]>(['Welcome to FearOS Terminal']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const commands: Record<string, string> = {
      help: 'Available commands: help, clear, echo, ls, pwd',
      clear: '',
      pwd: '/home/user',
      ls: 'Documents  Downloads  Pictures  Desktop  Music',
      echo: cmd.slice(5),
    };

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const command = cmd.split(' ')[0];
    const output = commands[command] || `Command not found: ${command}`;
    
    setHistory([...history, `$ ${cmd}`, output]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-full bg-black font-mono text-green-400 p-4 overflow-auto">
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <div className="flex">
        <span>$ </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none ml-2"
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}