// src/components/FirebaseTest.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';

function FirebaseTest() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Test authentication
    signInAnonymously(auth)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log('Signed in anonymously');
      })
      .catch((error) => {
        console.error('Auth error:', error);
      });
  }, []);

  const addTestData = async () => {
    try {
      const docRef = await addDoc(collection(db, "test"), {
        message: "Hello Firebase!",
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "test"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setData(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return (
    <div>
      <h2>Firebase Test</h2>
      <p>User: {user ? user.uid : 'Not signed in'}</p>
      <button onClick={addTestData}>Add Test Data</button>
      <button onClick={fetchData}>Fetch Data</button>
      <div>
        {data.map((item) => (
          <p key={item.id}>{item.message}</p>
        ))}
      </div>
    </div>
  );
}

export default FirebaseTest;