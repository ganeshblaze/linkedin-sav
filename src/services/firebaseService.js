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
    
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...postData,
        createdAt: new Date(),
      });
      
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