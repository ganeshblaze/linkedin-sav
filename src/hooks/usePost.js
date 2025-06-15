import { useState, useEffect } from 'react';
import { addPost, getPosts, deletePost } from '../services/firebaseService';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const postsData = await getPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNewPost = async (postData) => {
    try {
      const postId = await addPost(postData);
      const newPost = { id: postId, ...postData };
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  };

  const removePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return {
    posts,
    loading,
    addNewPost,
    removePost,
    refreshPosts: loadPosts
  };
};