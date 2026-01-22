import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, User, Users, Check, Star, Share2, Heart } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useEvents } from '../context/EventContext';
import styles from '../styles/EventDetail.module.css';

const EventDetail = () => {
  const { currentRoute, navigate } = useRouter();
  const { allEvents, registerForEvent, registeredEvents } = useEvents();
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const event = allEvents.find(e => e.id === currentRoute.params.eventId);
  const isRegistered = registeredEvents.includes(event?.id);

  // If event not found
  if (!event) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>😕</div>
          <h2 className={styles.errorTitle}>Event not found</h2>
          <p className={styles.errorText}>The event you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('home')} className={styles.errorButton}>
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const handleRSVP = () => {
    if (!isRegistered && event.attendees < event.maxAttendees) {
      registerForEvent(event.id);
      setShowConfirmation(true);
    }
  };

  const spotsLeft = event.maxAttendees - event.attendees;
  const attendancePercentage = (event.attendees / event.maxAttendees) * 100;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long',
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
    <div className={styles.container}>
      {/* Top Navigation Banner */}
      <div className={styles.navigationBanner}>
        <button 
          onClick={() => navigate('home')} 
          className={styles.homeButton}
          title="Return to home page"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className={styles.content}>
        {/* Back Button */}
        <button onClick={() => navigate('home')} className={styles.backButton}>
          <ArrowLeft />
          <span>Back to events</span>
        </button>

        {/* Event Detail Card */}
        <div className={styles.card}>
          {/* Event Image/Icon */}
          <div className={`${styles.imageWrapper} ${getGradientClass(event.type)}`}>
            <div className={styles.imageOverlay}></div>
            <div className={styles.imageIcon}>{event.image}</div>
            <div className={styles.decorCircle1}></div>
            <div className={styles.decorCircle2}></div>
            
            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button className={styles.actionButton}>
                <Share2 />
              </button>
              <button className={styles.actionButton}>
                <Heart />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className={styles.contentSection}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <h1 className={styles.title}>{event.title}</h1>
                <div className={styles.badgeRow}>
                  <span className={styles.typeBadge}>{event.type}</span>
                  <div className={styles.stars}>
                    <Star className={styles.starFilled} />
                    <Star className={styles.starFilled} />
                    <Star className={styles.starFilled} />
                    <Star className={styles.starFilled} />
                    <Star className={styles.starEmpty} />
                  </div>
                </div>
              </div>
              {isRegistered && (
                <div className={styles.registeredBadge}>
                  <Check />
                  <span>Registered</span>
                </div>
              )}
            </div>

            {/* Details Grid */}
            <div className={styles.detailsGrid}>
              {/* Date & Time */}
              <div className={styles.detailCard}>
                <div className={`${styles.detailIcon} ${styles.iconPurple}`}>
                  <Calendar />
                </div>
                <div className={styles.detailContent}>
                  <p className={`${styles.detailLabel} ${styles.labelPurple}`}>Date & Time</p>
                  <p className={styles.detailValue}>{formatDate(event.date)}</p>
                  <p className={styles.detailSubValue}>
                    <Clock />
                    {event.time}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className={styles.detailCard}>
                <div className={`${styles.detailIcon} ${styles.iconBlue}`}>
                  <MapPin />
                </div>
                <div className={styles.detailContent}>
                  <p className={`${styles.detailLabel} ${styles.labelBlue}`}>Location</p>
                  <p className={styles.detailValue}>{event.location}</p>
                </div>
              </div>

              {/* Host */}
              <div className={styles.detailCard}>
                <div className={`${styles.detailIcon} ${styles.iconGreen}`}>
                  <User />
                </div>
                <div className={styles.detailContent}>
                  <p className={`${styles.detailLabel} ${styles.labelGreen}`}>Hosted by</p>
                  <p className={styles.detailValue}>{event.host}</p>
                  <p className={styles.verifiedBadge}>⭐ Verified Host</p>
                </div>
              </div>

              {/* Attendees */}
              <div className={styles.detailCard}>
                <div className={`${styles.detailIcon} ${styles.iconOrange}`}>
                  <Users />
                </div>
                <div className={styles.detailContent}>
                  <p className={`${styles.detailLabel} ${styles.labelOrange}`}>Attendees</p>
                  <p className={styles.detailValue}>
                    {event.attendees} / {event.maxAttendees} registered
                  </p>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${attendancePercentage}%` }}
                    ></div>
                  </div>
                  {spotsLeft > 0 && spotsLeft <= 10 && (
                    <p className={styles.spotsWarning}>
                      🔥 {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>
                <div className={styles.titleBar}></div>
                About this event
              </h2>
              <p className={styles.description}>{event.description}</p>
            </div>

            {/* RSVP Button */}
            <button
              onClick={handleRSVP}
              disabled={isRegistered || spotsLeft === 0}
              className={`${styles.rsvpButton} ${
                isRegistered
                  ? styles.rsvpButtonDisabled
                  : spotsLeft === 0
                  ? styles.rsvpButtonFull
                  : styles.rsvpButtonActive
              }`}
            >
              {isRegistered ? '✓ Already Registered' : spotsLeft === 0 ? '⚠️ Event Full' : '🎉 RSVP for this Event'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalIcon}>
              <Check />
            </div>
            <h2 className={styles.modalTitle}>You're all set!</h2>
            <p className={styles.modalText}>Successfully registered for</p>
            <p className={styles.modalEventName}>{event.title}</p>
            <div className={styles.modalInfo}>
              <p>📅 {formatDate(event.date)} at {event.time}</p>
            </div>
            <div className={styles.modalButtons}>
              <button
                onClick={() => setShowConfirmation(false)}
                className={`${styles.modalButton} ${styles.modalButtonSecondary}`}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  navigate('myevents');
                }}
                className={`${styles.modalButton} ${styles.modalButtonPrimary}`}
              >
                View My Events
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;