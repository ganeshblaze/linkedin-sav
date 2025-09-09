import React from 'react';
import { ExternalLink, Calendar, Tag, User, Trash2 } from 'lucide-react';

const PostCard = ({ post, onDelete, isAuthenticated = false }) => {
  const handleVisitPost = () => {
    window.open(post.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      {/* Header with Author and Actions */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-full p-2">
              <User size={18} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {post.author || 'LinkedIn User'}
              </h3>
              {post.topic && (
                <p className="text-xs text-gray-600 mt-1">
                  Topic: {post.topic}
                </p>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleVisitPost}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Visit LinkedIn Post"
            >
              <ExternalLink size={16} />
            </button>
            {/* Only show delete button if authenticated and onDelete is provided */}
            {isAuthenticated && onDelete && (
              <button
                onClick={onDelete}
                disabled={false}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete Post"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
          {post.title || 'LinkedIn Post'}
        </h4>
        
        {post.preview && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {post.preview}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
              >
                <Tag size={10} className="mr-1" />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Date */}
        {post.dateAdded && (
          <div className="flex items-center text-xs text-gray-500">
            <Calendar size={12} className="mr-1" />
            Saved on {new Date(post.dateAdded).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* LinkedIn Preview Bar */}
      <div className="px-4 py-3 bg-blue-50 border-t border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-blue-700">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-sm font-medium">LinkedIn Post</span>
          </div>
          <button
            onClick={handleVisitPost}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;