import React from 'react';
import { Calendar, Clock, MapPin, Users, Check, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useEvents } from '../context/EventContext';
import styles from '../styles/EventCard.module.css';

const EventCard = ({ event }) => {
  const { navigate } = useRouter();
  const { registeredEvents } = useEvents();
  
  const isRegistered = registeredEvents.includes(event.id);
  const spotsLeft = event.maxAttendees - event.attendees;

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Get type-specific gradient class
  const getGradientClass = (type) => {
    const gradientMap = {
      'Fitness': styles.gradientFitness,
      'Music': styles.gradientMusic,
      'Meetup': styles.gradientMeetup,
      'Workshop': styles.gradientWorkshop,
      'Sports': styles.gradientSports,
      'Social': styles.gradientSocial,
      'Entertainment': styles.gradientEntertainment
    };
    return gradientMap[type] || styles.gradientMusic;
  };

  return (
    <div
      onClick={() => navigate('detail', { eventId: event.id })}
      className={styles.card}
    >
      {/* Registration Badge */}
      {isRegistered && (
        <div className={styles.registeredBadge}>
          <Check />
        </div>
      )}

      {/* Event Image/Icon */}
      <div className={`${styles.imageWrapper} ${getGradientClass(event.type)}`}>
        <div className={styles.imageOverlay}></div>
        <div className={styles.imageIcon}>{event.image}</div>
        <div className={styles.decorCircle1}></div>
        <div className={styles.decorCircle2}></div>
      </div>
      
      {/* Event Content */}
      <div className={styles.content}>
        {/* Title and Badge */}
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{event.title}</h3>
          <span className={styles.typeBadge}>{event.type}</span>
        </div>

        {/* Event Details */}
        <div className={styles.details}>
          {/* Date and Time */}
          <div className={styles.detailRow}>
            <div className={`${styles.iconBox} ${styles.iconBoxPurple}`}>
              <Calendar />
            </div>
            <span>{formatDate(event.date)}</span>
            <span style={{ color: 'var(--gray-400)' }}>•</span>
            <Clock />
            <span>{event.time}</span>
          </div>
          
          {/* Location */}
          <div className={styles.detailRow}>
            <div className={`${styles.iconBox} ${styles.iconBoxBlue}`}>
              <MapPin />
            </div>
            <span className={styles.locationText}>{event.location}</span>
          </div>
        </div>

        {/* Host and Attendees */}
        <div className={styles.hostSection}>
          <div className={styles.hostInfo}>
            <div className={styles.hostAvatar}>{event.hostImage}</div>
            <div className={styles.hostDetails}>
              <p className={styles.hostLabel}>Hosted by</p>
              <p className={styles.hostName}>{event.host}</p>
            </div>
          </div>
          
          <div className={styles.attendeeBadge}>
            <Users />
            <span>{event.attendees}/{event.maxAttendees}</span>
          </div>
        </div>

        {/* Spots Left Indicator */}
        {spotsLeft <= 5 && spotsLeft > 0 && (
          <div className={styles.spotsWarning}>
            <span>🔥 Only {spotsLeft} spots left!</span>
            <ArrowRight />
          </div>
        )}
        {spotsLeft === 0 && (
          <div className={styles.eventFull}>
            <span>Event Full</span>
          </div>
        )}

        {/* Hover Effect - View Details */}
        <div className={styles.viewDetails}>
          <span>View Details</span>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default EventCard;