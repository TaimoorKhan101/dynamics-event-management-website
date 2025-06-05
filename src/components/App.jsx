import React, { useState, useEffect } from 'react';

// Import all components
import Navigation from './subcomponents/navigationbar/Navigation';
import HeroSection from './subcomponents/HeroSection';
import SearchBar from './subcomponents/SearchBar';
import EventsSection from './subcomponents/eventssection/EventsSection';
import Footer from './subcomponents/Footer';

// Import data
import { eventsData } from '../eventsdata/eventsdata';

const App = () => {
  // State management
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API call with imported data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEvents(eventsData);
        setFilteredEvents(eventsData);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEvents(events);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = events.filter(event =>
      event.name.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.location.toLowerCase().includes(searchLower) ||
      event.category.toLowerCase().includes(searchLower)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  // Handle search input changes
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  // Handle search clear
  const handleSearchClear = () => {
    setSearchTerm('');
  };

  // Retry loading events
  const handleRetry = () => {
    setEvents([]);
    setFilteredEvents([]);
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setEvents(eventsData);
      setFilteredEvents(eventsData);
      setLoading(false);
    }, 1000);
  };

  // Error boundary fallback
  if (error) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center p-4 rounded shadow bg-white" style={{ maxWidth: 400, width: '100%' }}>
          <div className="mb-4 text-danger">
            <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
              <circle cx="12" cy="16" r="1" strokeWidth="2" />
            </svg>
          </div>
          <h2 className="h4 fw-bold text-dark mb-3">Oops! Something went wrong</h2>
          <p className="text-secondary mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="btn btn-primary fw-semibold px-4 py-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Navigation Bar */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Search Bar */}
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange}
        onSearchClear={handleSearchClear}
        resultsCount={filteredEvents.length}
        totalCount={events.length}
      />

      {/* Main Content - Events Section */}
      <main className="flex-grow-1">
        <EventsSection 
          events={filteredEvents} 
          loading={loading}
          searchTerm={searchTerm}
          onRetry={handleRetry}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;