import React, { useState, useRef, useEffect } from 'react';
import { Tag, X, ChevronDown, Info, XIcon } from 'lucide-react';
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
  // 'Node.js',
  // 'Python',
  // 'Data Science',
  'AI/ML',
  'Interview Prep',
  'Better Dev Tips',
  'Courses',
  'DevOps',
  'Cloud',
  'Entrepreneurship',
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
  const [showStoryModal, setShowStoryModal] = useState(false);
  
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
      {/* Authentication Banner */}
     

      {/* Story Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mb-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">
            Curious to know the story?
          </h3>
          <p className="text-purple-600 mb-4">
            Discover the journey behind this platform and what makes it special.
          </p>
          <button
            onClick={() => setShowStoryModal(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Yes, tell me!
          </button>
        </div>
      </div>

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Behind the scenes</h2>
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon size={24} />
                </button>
              </div>

              {/* Story Image */}
              <div className="w-full rounded-lg mb-6 overflow-hidden">
                <img 
                  src="/images/banner-image-thanos.jpg" 
                  alt="Fine I'll do it myself - Developer's journey"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.parentElement.style.display = 'none';
                  }}
                />
              </div>

              {/* Story Content */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>The Developer's Dilemma: When LinkedIn Doesn't Listen</strong>
                </p>
                <p>
                  Two years ago, like many developers and professionals, I found myself drowning in saved LinkedIn posts. You know the feeling - you save that brilliant system design post, that insightful career advice, or that awesome React tutorial, only to lose it in the endless abyss of LinkedIn's single saved posts section.
                </p>
                <p>
                  Frustrated by this limitation, I did what any reasonable person would do - <a href="https://www.linkedin.com/posts/ganesha-s96_request-for-linkedin-to-add-the-collections-activity-7062708519933808640-Bklg" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">I posted a feature request on LinkedIn</a> in May 2023, asking them to add a collections feature similar to Pinterest and Instagram. The response? Crickets. 
                </p>
                <p>
                  After waiting patiently for LinkedIn to implement this obvious feature, I realized I had two choices: continue being frustrated or do something about it. As a developer, the choice was clear - "Fine, I'll do it myself!"
                </p>
                <p>
                  This web application was born out of pure necessity. What started as a personal tool to organize my own saved LinkedIn posts has evolved into something that could potentially help thousands of professionals facing the same problem. The irony? Building a solution that LinkedIn should have implemented years ago.
                </p>
                <p>
                  <strong>The AI-Powered Development Journey:</strong> Here's where it gets interesting - not a single line of code in this application was written by human hands. Every component, every function, every feature was generated using AI models (primarily Claude and ChatGPT). However, the creative vision, architecture decisions, user experience design, and rigorous code reviews were all human-driven. It's a perfect example of human creativity meeting AI capability.
                </p>
                <p>
                  The development process involved countless iterations of prompting, reviewing, and refining AI-generated code. While the AI handled the technical heavy lifting, the human touch ensured the application actually solved real problems with intuitive design and meaningful functionality.
                </p>
                <p>
                  Currently, this is my personal workspace where I organize posts by tags like React, System Design, Career Advice, and more. But the vision is bigger - to scale this solution for public use, giving every professional the power to organize their LinkedIn discoveries the way they want.
                </p>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="bg-gray-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Info className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">Currently Authentication is in progress... <br/>
              The save feature is only available for the creator of the application at the moment.
              Feel free to browse through the Saved Posts :)
            </span>
          </div>
        </div>
      </div>

      {/* Main Form */}
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
              disabled={true}
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
            disabled={true}
            // disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-pointing transition-colors"
          >
            {loading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;