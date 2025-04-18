import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ContentGenerator from './components/ContentGenerator';
import Profile from './components/Profile';
import ContentCalendar from './components/ContentCalendar';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, logPageView } from "./analytics";
import UserProfile from './components/UserProfile';
import ContentHistory from './ContentHistory';
import Projects from './components/Projects';

function App() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);
  
  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);
    
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<ContentGenerator />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<ContentCalendar />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/history" element={<ContentHistory />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
