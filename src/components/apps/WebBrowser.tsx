import React, { useState } from 'react';
import { Search, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

export default function WebBrowser() {
  const [url, setUrl] = useState('https://www.google.com');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const getEmbedUrl = (inputUrl: string) => {
    if (inputUrl.includes('youtube.com')) {
      const videoId = inputUrl.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return `https://api.allorigins.win/raw?url=${encodeURIComponent(inputUrl)}`;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center space-x-2 p-2 bg-amber-800 rounded">
        <button className="p-1 hover:bg-amber-700 rounded">
          <ArrowLeft className="w-4 h-4 text-amber-100" />
        </button>
        <button className="p-1 hover:bg-amber-700 rounded">
          <ArrowRight className="w-4 h-4 text-amber-100" />
        </button>
        <button className="p-1 hover:bg-amber-700 rounded">
          <RefreshCw className={`w-4 h-4 text-amber-100 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        <form onSubmit={handleSubmit} className="flex-1 flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-300" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 bg-amber-700 text-amber-100 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-300"
              placeholder="Enter URL or search..."
            />
          </div>
        </form>
      </div>
      <div className="flex-1 mt-4 bg-white rounded">
        <iframe
          src={getEmbedUrl(url)}
          className="w-full h-full rounded"
          title="browser"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
}