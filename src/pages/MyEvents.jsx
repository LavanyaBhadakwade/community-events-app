import React from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Check } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useEvents } from '../context/EventContext';
import styles from '../styles/MyEvents.module.css';

const MyEvents = () => {
  const { navigate } = useRouter();
  const { allEvents, registeredEvents } = useEvents();
  
  // Filter events user has registered for
  const myEvents = allEvents.filter(e => registeredEvents.includes(e.id));

  // Sort events by date (upcoming first)
  const sortedEvents = [...myEvents].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Check if event is upcoming or past
  const isUpcoming = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  // Separate upcoming and past events
  const upcomingEvents = sortedEvents.filter(e => isUpcoming(e.date));
  const pastEvents = sortedEvents.filter(e => !isUpcoming(e.date));

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Back Button */}
        <button onClick={() => navigate('home')} className={styles.backButton}>
          <ArrowLeft />
          <span>Back to events</span>
        </button>

        {/* Page Header */}
        <div className={styles.headerCard}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>My Events</h1>
            <div className={styles.badge}>
              {myEvents.length} Event{myEvents.length !== 1 ? 's' : ''}
            </div>
          </div>
          <p className={styles.subtitle}>Events you've registered for</p>
        </div>

        {/* No Events State */}
        {myEvents.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📅</div>
            <h3 className={styles.emptyTitle}>No events yet</h3>
            <p className={styles.emptyText}>Start exploring and register for events!</p>
            <button onClick={() => navigate('home')} className={styles.emptyButton}>
              Browse Events
            </button>
          </div>
        ) : (
          <>
            {/* Upcoming Events Section */}
            {upcomingEvents.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <span className={`${styles.statusDot} ${styles.statusDotGreen}`}></span>
                  Upcoming Events ({upcomingEvents.length})
                </h2>
                <div className={styles.eventsList}>
                  {upcomingEvents.map(event => (
                    <EventItem 
                      key={event.id} 
                      event={event} 
                      navigate={navigate} 
                      formatDate={formatDate} 
                      isUpcoming={true} 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Past Events Section */}
            {pastEvents.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <span className={`${styles.statusDot} ${styles.statusDotGray}`}></span>
                  Past Events ({pastEvents.length})
                </h2>
                <div className={styles.eventsList}>
                  {pastEvents.map(event => (
                    <EventItem 
                      key={event.id} 
                      event={event} 
                      navigate={navigate} 
                      formatDate={formatDate} 
                      isUpcoming={false} 
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Event Item Component
const EventItem = ({ event, navigate, formatDate, isUpcoming }) => {
  return (
    <div
      onClick={() => navigate('detail', { eventId: event.id })}
      className={`${styles.eventItem} ${!isUpcoming ? styles.eventItemPast : ''}`}
    >
      <div className={styles.eventContent}>
        {/* Event Icon */}
        <div className={`${styles.eventIcon} ${isUpcoming ? styles.eventIconActive : styles.eventIconPast}`}>
          {event.image}
        </div>
        
        {/* Event Details */}
        <div className={styles.eventDetails}>
          <div className={styles.eventHeader}>
            <div className={styles.eventHeaderLeft}>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <span className={`${styles.eventTypeBadge} ${isUpcoming ? styles.eventTypeBadgeActive : styles.eventTypeBadgePast}`}>
                {event.type}
              </span>
            </div>
            
            {/* Registration Badge */}
            <div className={`${styles.checkBadge} ${isUpcoming ? styles.checkBadgeActive : styles.checkBadgePast}`}>
              <Check />
            </div>
          </div>

          {/* Event Info */}
          <div className={styles.eventInfo}>
            <div className={styles.infoRow}>
              <Calendar />
              <span>{formatDate(event.date)}</span>
              <Clock />
              <span>{event.time}</span>
            </div>
            
            <div className={styles.infoRow}>
              <MapPin />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Event Status */}
          {!isUpcoming && (
            <div className={styles.eventStatus}>
              This event has ended
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;