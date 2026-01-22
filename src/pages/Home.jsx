import React from 'react';
import SearchAndFilters from '../components/SearchAndFilters';
import EventList from '../components/EventList';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <SearchAndFilters />
      <EventList />
    </div>
  );
};

export default Home;