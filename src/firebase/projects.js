// src/firebase/projects.js
import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const projectsCollection = collection(db, 'projects');

export const addProject = async (project) => {
  await addDoc(projectsCollection, project);
};

export const getProjects = async () => {
  const snapshot = await getDocs(projectsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateProject = async (projectId, updatedData) => {
  const projectRef = doc(db, 'projects', projectId);
  await updateDoc(projectRef, updatedData);
};

export const deleteProject = async (projectId) => {
  const projectRef = doc(db, 'projects', projectId);
  await deleteDoc(projectRef);
};
