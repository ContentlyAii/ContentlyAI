// Import Firebase dependencies
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBcoLTtsCI5wHJSeF1wBTNlrNMzobkuEao",
  authDomain: "contently-ai.firebaseapp.com",
  projectId: "contently-ai",
  storageBucket: "contently-ai.firebasestorage.app",
  messagingSenderId: "720240761520 ",
  appId: "1:720240761520:web:0a796b00056e9e95ce3975"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Export functions and constants
export const getUserProfile = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const getContentHistory = async (userId) => {
  const contentRef = collection(db, "contentHistory");
  const querySnapshot = await getDocs(contentRef);
  const contentData = [];
  querySnapshot.forEach((doc) => {
    contentData.push(doc.data());
  });
  return contentData;
};

// Export everything you need
export { auth, provider, db };