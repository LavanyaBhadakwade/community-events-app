import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useEvents } from '../context/EventContext';
import { EVENT_TYPES } from '../data/mockEvents';
import styles from '../styles/CreateEvent.module.css';

const CreateEvent = () => {
  const { navigate } = useRouter();
  const { createEvent } = useEvents();
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'Workshop',
    date: '',
    time: '',
    location: '',
    description: '',
    host: '',
    maxAttendees: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Available event types (excluding 'All')
  const eventTypes = EVENT_TYPES.filter(type => type !== 'All');

  // Validation function
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.trim().length < 3) {
      newErrors.location = 'Location must be at least 3 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (!formData.host.trim()) {
      newErrors.host = 'Host name is required';
    } else if (formData.host.trim().length < 2) {
      newErrors.host = 'Host name must be at least 2 characters';
    }
    
    if (!formData.maxAttendees) {
      newErrors.maxAttendees = 'Max attendees is required';
    } else if (formData.maxAttendees < 1) {
      newErrors.maxAttendees = 'Must allow at least 1 attendee';
    } else if (formData.maxAttendees > 1000) {
      newErrors.maxAttendees = 'Maximum 1000 attendees allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Format time to 12-hour format
      const formatTime = (time24) => {
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
      };

      createEvent({
        ...formData,
        time: formatTime(formData.time),
        maxAttendees: parseInt(formData.maxAttendees)
      });
      
      setShowSuccess(true);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Success screen
  if (showSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <Check />
          </div>
          <h2 className={styles.successTitle}>Event Created!</h2>
          <p className={styles.successText}>Your event has been successfully created.</p>
          <p className={styles.successEventName}>{formData.title}</p>
          <button onClick={() => navigate('home')} className={styles.successButton}>
            View All Events
          </button>
        </div>
      </div>
    );
  }

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
        <button onClick={() => navigate('home')} className={styles.backButton} title="Return to home page">
          <ArrowLeft />
          <span>Take me to Home</span>
        </button>

        {/* Form Card */}
        <div className={styles.card}>
          <h1 className={styles.title}>Create New Event</h1>
          <p className={styles.subtitle}>Fill in the details to create your community event</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Event Title */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Event Title <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                placeholder="e.g., Morning Yoga Session"
              />
              {errors.title && <p className={styles.error}>{errors.title}</p>}
            </div>

            {/* Event Type and Max Attendees */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Event Type <span className={styles.required}>*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={styles.select}
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Max Attendees <span className={styles.required}>*</span>
                </label>
                <input
                  type="number"
                  name="maxAttendees"
                  value={formData.maxAttendees}
                  onChange={handleChange}
                  min="1"
                  max="1000"
                  className={`${styles.input} ${errors.maxAttendees ? styles.inputError : ''}`}
                  placeholder="e.g., 30"
                />
                {errors.maxAttendees && <p className={styles.error}>{errors.maxAttendees}</p>}
              </div>
            </div>

            {/* Date and Time */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Date <span className={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                />
                {errors.date && <p className={styles.error}>{errors.date}</p>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Time <span className={styles.required}>*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.time ? styles.inputError : ''}`}
                />
                {errors.time && <p className={styles.error}>{errors.time}</p>}
              </div>
            </div>

            {/* Location */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Location <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`${styles.input} ${errors.location ? styles.inputError : ''}`}
                placeholder="e.g., Cubbon Park, Bangalore"
              />
              {errors.location && <p className={styles.error}>{errors.location}</p>}
            </div>

            {/* Host Name */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Host Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="host"
                value={formData.host}
                onChange={handleChange}
                className={`${styles.input} ${errors.host ? styles.inputError : ''}`}
                placeholder="e.g., John Smith"
              />
              {errors.host && <p className={styles.error}>{errors.host}</p>}
            </div>

            {/* Description */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Description <span className={styles.required}>*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                placeholder="Describe your event, what attendees can expect, and any requirements..."
              />
              <div className={styles.charCounter}>
                {errors.description ? (
                  <p className={styles.error}>{errors.description}</p>
                ) : (
                  <p className={styles.charCounterText}>Minimum 20 characters</p>
                )}
                <p className={styles.charCount}>{formData.description.length} characters</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className={styles.buttonRow}>
              <button
                type="button"
                onClick={() => navigate('home')}
                className={`${styles.button} ${styles.buttonSecondary}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;