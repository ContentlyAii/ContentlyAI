import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Make sure to export your Firestore instance

const Profile = () => {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = getAuth();
    const storage = getStorage();

    // Fetch user profile data from Firestore
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setBio(docSnap.data().bio || '');
                    // You can also load profile image URL if stored
                }
            }
        });
        return () => unsubscribe();
    }, [auth]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `profile_pictures/${user.uid}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Optional: Show progress here
                },
                (error) => console.error(error),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    // Update the profile with the new image URL
                    await updateDoc(doc(db, 'users', user.uid), {
                        profileImage: downloadURL,
                    });
                }
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { bio }, { merge: true });

        setLoading(false);
        alert('Profile updated successfully!');
    };

    return (
        <div className="container mx-auto p-6">
            {user ? (
                <div>
                    <h2 className="text-2xl mb-4">Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block">Bio</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Write your bio"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block">Profile Image</label>
                            <input type="file" onChange={handleImageUpload} className="p-2" />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            ) : (
                <p>Please log in to edit your profile.</p>
            )}
        </div>
    );
};

export default Profile;
