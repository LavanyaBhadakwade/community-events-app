import React, { createContext, useContext, useState } from 'react';
import { MOCK_EVENTS } from '../data/mockEvents';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    date: '',
    location: ''
  });

  // Register user for an event
  const registerForEvent = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
      setEvents(events.map(e => 
        e.id === eventId ? { ...e, attendees: e.attendees + 1 } : e
      ));
      return true;
    }
    return false;
  };

  // Create a new event
  const createEvent = (newEvent) => {
    const event = {
      ...newEvent,
      id: events.length + 1,
      attendees: 0,
      hostImage: newEvent.host.split(' ').map(n => n[0]).join(''),
      image: "🎉"
    };
    setEvents([event, ...events]);
  };

  // Filter events based on current filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         event.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === 'All' || event.type === filters.type;
    const matchesDate = !filters.date || event.date === filters.date;
    const matchesLocation = !filters.location || 
                           event.location.toLowerCase().includes(filters.location.toLowerCase());
    
    return matchesSearch && matchesType && matchesDate && matchesLocation;
  });

  return (
    <EventContext.Provider value={{
      events: filteredEvents,
      allEvents: events,
      registeredEvents,
      filters,
      setFilters,
      registerForEvent,
      createEvent
    }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use event context
export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};