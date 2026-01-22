// src/App.jsx

import React from 'react';
import { Router, useRouter } from './context/RouterContext';
import { EventProvider } from './context/EventContext';
import Header from './components/Header';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import MyEvents from './pages/MyEvents';

// Router View Component - Renders current page based on route
const RouterView = () => {
  const { currentRoute } = useRouter();

  switch (currentRoute.page) {
    case 'home':
      return <Home />;
    case 'detail':
      return <EventDetail />;
    case 'create':
      return <CreateEvent />;
    case 'myevents':
      return <MyEvents />;
    default:
      return <Home />;
  }
};

// Main App Component
const App = () => {
  return (
    <Router>
      <EventProvider>
        <div style={{ minHeight: '100vh' }}>
          <Header />
          <RouterView />
        </div>
      </EventProvider>
    </Router>
  );
};

export default App;