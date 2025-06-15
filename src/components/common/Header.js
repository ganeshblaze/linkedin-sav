import React from 'react';
import { BookmarkPlus, Plus } from 'lucide-react';

const Header = ({ activeTab, setActiveTab, postsCount }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookmarkPlus className="text-blue-600" size={28} />
            <h1 className="text-2xl font-bold text-gray-900">LinkedIn Saver</h1>
          </div>
          
          <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('add')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'add' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Plus size={16} className="inline mr-2" />
              Add Post
            </button>
            <button
              onClick={() => setActiveTab('view')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'view' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookmarkPlus size={16} className="inline mr-2" />
              My Saves ({postsCount})
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;