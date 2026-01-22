import React from 'react';
import { Calendar, Plus, Users, Sparkles } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useEvents } from '../context/EventContext';
import styles from '../styles/Header.module.css';

const Header = () => {
  const { navigate } = useRouter();
  const { registeredEvents } = useEvents();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Logo and Brand */}
          <div className={styles.logo} onClick={() => navigate('home')}>
            <div className={styles.logoIconWrapper}>
              <div className={styles.logoIcon}>
                <Calendar />
              </div>
              <div className={styles.sparkle}>
                <Sparkles />
              </div>
            </div>
            <div className={styles.logoText}>
              <h1>EventHub</h1>
              <p>Discover Amazing Events</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className={styles.actions}>
            {/* Create Event Button */}
            <button
              onClick={() => navigate('create')}
              className={styles.createButton}
            >
              <Plus />
              <span className={styles.textShort}>Create</span>
              <span className={styles.textLong}>Create Event</span>
            </button>
            
            {/* My Events Button with Badge */}
            {registeredEvents.length > 0 && (
              <div className={styles.myEventsWrapper}>
                <button
                  onClick={() => navigate('myevents')}
                  className={styles.myEventsButton}
                  aria-label="My Events"
                >
                  <Users />
                </button>
                <span className={styles.badge}>
                  {registeredEvents.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative gradient line */}
      <div className={styles.gradientLine}></div>
    </header>
  );
};

export default Header;