import React, { useState } from 'react';
import { Search, Filter, BookmarkPlus } from 'lucide-react';
import PostCard from '../common/PostCard';
import ConfirmDeleteModal from '../common/ConfirmDeleteModal';

const ViewPosts = ({ posts, loading, onRefresh, onDeletePost }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, post: null });

  // Get all unique tags
  const allTags = [...new Set(posts.flatMap(post => post.tags || []))];

  // Filter posts based on search and tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = (post.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (post.author?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (post.preview?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const handleDeleteClick = (post) => {
    setDeleteModal({ isOpen: true, post });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.post) {
      try {
        await onDeletePost(deleteModal.post.id);
        setDeleteModal({ isOpen: false, post: null });
      } catch (error) {
        console.error('Error deleting post:', error);
        // You could add error handling here (toast notification, etc.)
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, post: null });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your saved posts...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>#{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <BookmarkPlus className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {posts.length === 0 ? 'No saved posts yet' : 'No posts match your search'}
          </h3>
          <p className="text-gray-600">
            {posts.length === 0 
              ? 'Start by adding your first LinkedIn post!' 
              : 'Try adjusting your search terms or filters.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onDelete={() => handleDeleteClick(post)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        post={deleteModal.post}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ViewPosts;