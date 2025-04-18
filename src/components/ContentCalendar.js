import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const ContentCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        const querySnapshot = await getDocs(collection(db, `users/${user.uid}/calendar`));
        const loadedEvents = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          start: new Date(doc.data().start),
          end: new Date(doc.data().end),
        }));
        setEvents(loadedEvents);
      }
    };
    fetchEvents();
  }, [user]);

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;

    const newEv = {
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
    };

    setEvents([...events, newEv]);

    if (user) {
      await addDoc(collection(db, `users/${user.uid}/calendar`), newEv);
    }

    setNewEvent({ title: '', start: '', end: '' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Content Calendar</h2>

      <div className="flex flex-col md:flex-row mb-6 gap-2">
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="border p-2 rounded w-full md:w-auto"
        />
        <input
          type="datetime-local"
          value={newEvent.start}
          onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
          className="border p-2 rounded w-full md:w-auto"
        />
        <input
          type="datetime-local"
          value={newEvent.end}
          onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
          className="border p-2 rounded w-full md:w-auto"
        />
        <button
          onClick={handleAddEvent}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default ContentCalendar;
