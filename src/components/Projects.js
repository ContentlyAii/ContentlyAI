import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, provider, db, getUserProfile, getContentHistory } from '../firebase/firebase';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const colRef = collection(db, 'projects');
    const snapshot = await getDocs(colRef);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProjects(items);
  };

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, 'projects', id));
    fetchProjects(); // Refresh list
  };

  const startEditing = (project) => {
    setEditingProject(project.id);
    setEditedTitle(project.title);
    setEditedContent(project.content);
  };

  const saveEdit = async () => {
    const docRef = doc(db, 'projects', editingProject);
    await updateDoc(docRef, {
      title: editedTitle,
      content: editedContent
    });
    setEditingProject(null);
    fetchProjects(); // Refresh list
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      {projects.map(project => (
        <div key={project.id} className="mb-4 p-4 border rounded shadow">
          {editingProject === project.id ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
              <button onClick={saveEdit} className="bg-green-500 text-white px-4 py-2 mr-2 rounded">Save</button>
              <button onClick={() => setEditingProject(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="mb-2">{project.content}</p>
              <button onClick={() => startEditing(project)} className="bg-yellow-500 text-white px-4 py-1 mr-2 rounded">Edit</button>
              <button onClick={() => deleteProject(project.id)} className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
