import React, { useState } from 'react';
import { Folder, File, ChevronRight, Home } from 'lucide-react';

type FileItem = {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified?: string;
};

export default function FileManager() {
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [files] = useState<FileItem[]>([
    { name: 'Documents', type: 'folder', modified: '2024-03-15' },
    { name: 'Downloads', type: 'folder', modified: '2024-03-14' },
    { name: 'Pictures', type: 'folder', modified: '2024-03-13' },
    { name: 'report.pdf', type: 'file', size: '2.5 MB', modified: '2024-03-12' },
    { name: 'notes.txt', type: 'file', size: '12 KB', modified: '2024-03-11' },
  ]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center space-x-2 p-2 bg-gray-700 rounded">
        <button className="p-1 hover:bg-gray-600 rounded">
          <Home className="w-4 h-4 text-white" />
        </button>
        <div className="flex-1 px-3 py-1.5 bg-gray-600 text-white rounded">
          {currentPath}
        </div>
      </div>
      <div className="flex-1 mt-4">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="text-left pb-2">Name</th>
              <th className="text-left pb-2">Size</th>
              <th className="text-left pb-2">Modified</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr
                key={file.name}
                className="text-white hover:bg-gray-700 cursor-pointer"
              >
                <td className="py-2 flex items-center space-x-2">
                  {file.type === 'folder' ? (
                    <Folder className="w-5 h-5 text-blue-400" />
                  ) : (
                    <File className="w-5 h-5 text-gray-400" />
                  )}
                  <span>{file.name}</span>
                </td>
                <td>{file.size || '--'}</td>
                <td>{file.modified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}