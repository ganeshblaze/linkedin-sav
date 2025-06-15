import React, { useState, useRef, useEffect } from 'react';
import { Tag, X, ChevronDown } from 'lucide-react';
import { parseLinkedInUrl } from '../../utils/linkedinParser';

// Hardcoded tags - you can modify this array to add/remove tags
const AVAILABLE_TAGS = [
  'React',
  'JavaScript',
  'Web Development',
  'Frontend',
  'Backend',
  'Full Stack',
  'System Design',
  'UI/UX',
  // 'Node.js',
  // 'Python',
  // 'Data Science',
   'AI Tips',
  'Machine Learning',
  'DevOps',
  'Cloud',
  'Entrepreneurship',
  'Career',
  'Technology',
  'Programming',
  'Software Engineering',
  'Job Referrals'
];

const AddPost = ({ onPostAdded, onSwitchToView }) => {
  const [newUrl, setNewUrl] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Ref for the dropdown container
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const postInfo = parseLinkedInUrl(newUrl);
      
      const newPostData = {
        url: newUrl,
        tags: selectedTags,
        title: postInfo.title,
        author: postInfo.author,
        preview: postInfo.preview,
        dateAdded: new Date().toISOString().split('T')[0]
      };

      await onPostAdded(newPostData);
      setNewUrl('');
      setSelectedTags([]);
      onSwitchToView();
    } catch (error) {
      console.error('Error adding post:', error);
      setError(error.message || 'Error adding post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const availableTagsToShow = AVAILABLE_TAGS.filter(tag => !selectedTags.includes(tag));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Save LinkedIn Post</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn Post URL
            </label>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => {
                setNewUrl(e.target.value)
                setError("")
              }}
              placeholder="https://linkedin.com/posts/..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleAddPost(e)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            
            {/* Selected Tags Display */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    <Tag size={14} className="mr-1" />
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
              >
                <span className="text-gray-500">
                  {selectedTags.length > 0 
                    ? `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected`
                    : 'Select tags...'
                  }
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {availableTagsToShow.length > 0 ? (
                    availableTagsToShow.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                      >
                        <Tag size={16} className="mr-2 text-gray-400" />
                        {tag}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-sm">
                      All tags selected
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleAddPost}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;