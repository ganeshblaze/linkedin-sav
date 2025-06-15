import { 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    orderBy, 
    query 
  } from 'firebase/firestore';
  import { db } from '../firebase';
  
  const COLLECTION_NAME = 'linkedin_posts';
  
  export const addPost = async (postData) => {
    try {
      console.log('Attempting to add post:', postData);
      console.log('Database instance:', db);
      console.log('Collection name:', COLLECTION_NAME);
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...postData,
        createdAt: new Date(),
      });
      
      console.log('Post added successfully with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding post - Full error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw error;
    }
  };
  
  export const getPosts = async () => {
    try {
      console.log('Attempting to get posts from:', COLLECTION_NAME);
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      console.log('Retrieved posts count:', querySnapshot.docs.length);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting posts - Full error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw error;
    }
  };
  
  export const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };