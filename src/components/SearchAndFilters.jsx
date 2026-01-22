import React, { useState } from 'react';
import { Search, Filter, X, Sliders } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { EVENT_TYPES } from '../data/mockEvents';
import styles from '../styles/SearchAndFilters.module.css';

const SearchAndFilters = () => {
  const { filters, setFilters } = useEvents();
  const [showFilters, setShowFilters] = useState(false);

  const handleClearFilters = () => {
    setFilters({
      search: '',
      type: 'All',
      date: '',
      location: ''
    });
  };

  const hasActiveFilters = filters.search || filters.type !== 'All' || filters.date || filters.location;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Search Bar and Filter Toggle */}
        <div className={styles.searchRow}>
          {/* Search Input */}
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search amazing events..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className={styles.searchInput}
            />
          </div>
          
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`${styles.filterButton} ${showFilters ? styles.filterButtonActive : ''}`}
            aria-label="Toggle filters"
          >
            <Sliders />
            <span>Filters</span>
          </button>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className={styles.clearButton}
              aria-label="Clear filters"
            >
              <X />
            </button>
          )}
        </div>

        {/* Advanced Filters - Collapsible */}
        {showFilters && (
          <div className={styles.filtersGrid}>
            {/* Type Filter */}
            <div className={`${styles.filterCard} ${styles.filterCardPurple}`}>
              <label className={`${styles.filterLabel} ${styles.filterLabelPurple}`}>
                Event Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className={styles.filterSelect}
              >
                {EVENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div className={`${styles.filterCard} ${styles.filterCardPink}`}>
              <label className={`${styles.filterLabel} ${styles.filterLabelPink}`}>
                Event Date
              </label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className={styles.filterInput}
              />
            </div>

            {/* Location Filter */}
            <div className={`${styles.filterCard} ${styles.filterCardRed}`}>
              <label className={`${styles.filterLabel} ${styles.filterLabelRed}`}>
                Location
              </label>
              <input
                type="text"
                placeholder="e.g., Bangalore..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className={styles.filterInput}
              />
            </div>
          </div>
        )}

        {/* Quick Filter Chips */}
        <div className={styles.chipsWrapper}>
          {EVENT_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setFilters({ ...filters, type })}
              className={`${styles.chip} ${filters.type === type ? styles.chipActive : ''}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;