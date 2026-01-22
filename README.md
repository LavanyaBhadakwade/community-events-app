# EventHub - Community Events App

A modern, responsive web application for discovering, creating, and managing community events.

## Features

- **Browse Events** - Discover upcoming community events with detailed information
- **Create Events** - Easily create and share new events with the community
- **Manage Registrations** - Track events you've registered for
- **Search & Filter** - Find events by category, location, date, and more
- **Event Details** - View comprehensive information about each event
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **React 19** - Modern UI library with latest features
- **Vite** - Lightning-fast build tool and dev server
- **React Context API** - State management for events and routing
- **Lucide React** - Beautiful icon components
- **CSS Modules** - Scoped styling for components
- **ESLint** - Code quality and best practices

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── Header.jsx   # Navigation header
│   ├── EventCard.jsx
│   ├── EventList.jsx
│   └── SearchAndFilters.jsx
├── context/         # React Context for state management
│   ├── EventContext.jsx
│   └── RouterContext.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── EventDetail.jsx
│   ├── CreateEvent.jsx
│   └── MyEvents.jsx
├── data/            # Mock data
│   └── mockEvents.js
├── styles/          # CSS stylesheets
│   └── global.css
└── App.jsx          # Main app component
```

## Features in Detail

### Home Page
Browse all available events with a clean, card-based layout

### Event Details
View comprehensive information about each event including date, time, location, and description

### Create Event
Submit new events to the community with all relevant details

### My Events
Track and manage events you've registered for

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
