// src/ContentHistory.js
import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

const ContentHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) return;

      const colRef = collection(db, 'contentHistory');
      const q = query(
        colRef,
        where('uid', '==', auth.currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistory(items);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Content History</h1>
      {history.length === 0 ? (
        <p className="text-gray-600">No content generated yet.</p>
      ) : (
        history.map(item => (
          <div key={item.id} className="mb-4 p-4 border border-gray-200 rounded-lg shadow">
            <p className="text-sm text-gray-500 mb-2">
              Generated on: {item.createdAt?.toDate().toLocaleString()}
            </p>
            <p className="font-semibold">Prompt:</p>
            <p className="mb-2">{item.prompt}</p>
            <p className="font-semibold">Result:</p>
            <p>{item.result}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ContentHistory;
