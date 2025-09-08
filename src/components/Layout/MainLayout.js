import React, { useState } from 'react';
import Header from '../common/Header';
import AddPost from '../pages/AddPost';
import ViewPosts from '../pages/ViewPosts';
import { usePosts } from '../../hooks/usePost';

const MainLayout = ({ isAuthenticated = false }) => {
  const [activeTab, setActiveTab] = useState('add');
  const { posts, loading, addNewPost, removePost, refreshPosts } = usePosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        postsCount={posts.length}
        isAuthenticated={isAuthenticated}
      />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'add' && (
          <AddPost 
            onPostAdded={addNewPost}
            onSwitchToView={() => setActiveTab('view')}
            isAuthenticated={isAuthenticated}
          />
        )}
        
        {activeTab === 'view' && (
          <ViewPosts 
            posts={posts}
            loading={loading}
            onRefresh={refreshPosts}
            onDeletePost={removePost}
            isAuthenticated={isAuthenticated}
          />
        )}
      </main>
    </div>
  );
};

export default MainLayout;