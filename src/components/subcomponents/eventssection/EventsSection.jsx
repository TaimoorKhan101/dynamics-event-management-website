import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight} from 'lucide-react';
import EventCard from './EventCard';
import LoadingSpinner from './LoadingSpinner';

const EventsSection = ({ events, loading, searchTerm }) => {
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef(null);
  const cardWidth = 350; // Approximate width of each card including gap
  const autoScrollSpeed = 1; // Pixels per frame
  const manualScrollSpeed = cardWidth; // Distance to scroll on manual navigation

  // Check if user is actively searching
  const isSearching = searchTerm && searchTerm.trim().length > 0;

  // Use original events when searching, duplicated events when not searching
  const displayEvents = isSearching ? events : (events.length > 0 ? [...events, ...events, ...events, ...events, ...events] : []);

  // Auto-scroll functionality - disabled when searching
  useEffect(() => {
    if (displayEvents.length === 0 || isPaused || isSearching) return;

    const animationFrame = () => {
      setTranslateX(prev => {
        const newTranslateX = prev + autoScrollSpeed;
        // Reset position when we've scrolled through one complete set
        if (newTranslateX >= events.length * cardWidth) {
          return 0;
        }
        return newTranslateX;
      });
    };

    const intervalId = setInterval(animationFrame, 50); // 20fps for smooth movement
    return () => clearInterval(intervalId);
  }, [displayEvents.length, isPaused, events.length, cardWidth, autoScrollSpeed, isSearching]);

  // Reset translateX when switching between search and non-search modes
  useEffect(() => {
    setTranslateX(0);
  }, [isSearching]);

  const scrollToPosition = (newTranslateX) => {
    setIsTransitioning(true);
    setTranslateX(newTranslateX);
  };

  const goToPrevious = () => {
    if (isSearching) return; // Disable manual navigation when searching
    
    setIsPaused(true);
    const newPosition = Math.max(translateX - manualScrollSpeed, 0);
    scrollToPosition(newPosition);
    
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsPaused(false), 3000);
  };

  const goToNext = () => {
    if (isSearching) return; // Disable manual navigation when searching
    
    setIsPaused(true);
    const maxScroll = events.length * cardWidth;
    let newPosition = translateX + manualScrollSpeed;
    
    // Handle wrap-around
    if (newPosition >= maxScroll) {
      newPosition = 0;
    }
    
    scrollToPosition(newPosition);
    
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setIsPaused(false), 3000);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-2">
      <div className="container-fluid px-4">
        <div className="text-center mb-2">
          <h2 className="display-6 fw-bold text-dark mb-3">
            {isSearching ? 'Search Results' : 'Featured Events'}
          </h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: 600 }}>
            {isSearching 
              ? `Found ${events.length} event${events.length !== 1 ? 's' : ''} matching your search`
              : 'Don\'t miss out on these exciting upcoming events in your area'
            }
          </p>
        </div>

        {events.length > 0 ? (
          <div className="position-relative">
            {/* Main Carousel Container */}
            <div 
              ref={containerRef}
              className="overflow-hidden position-relative"
              style={{ 
                width: '100%',
                height: '500px'
              }}
              onMouseEnter={() => !isSearching && setIsPaused(true)}
              onMouseLeave={() => !isSearching && setIsPaused(false)}
            >
              <div
                className={isSearching ? "d-flex gap-4 flex-wrap justify-content-center" : "d-flex gap-4 position-absolute"}
                style={isSearching ? {
                  // Static grid layout for search results
                  padding: '0 1rem'
                } : {
                  // Scrolling carousel layout for normal view
                  transform: `translateX(-${translateX}px)`,
                  transition: isPaused && isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                  left: 0,
                  top: 0,
                  willChange: 'transform'
                }}
              >
                {displayEvents.map((event, index) => (
                  <div
                    key={isSearching ? event.id : `${event.id}-${Math.floor(index / events.length)}`}
                    className={isSearching ? "mb-4" : "flex-shrink-0"}
                    style={isSearching ? { 
                      width: '100%',
                      maxWidth: `${cardWidth - 16}px`
                    } : { 
                      width: `${cardWidth - 16}px` // Account for gap
                    }}
                  >
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls - Hidden when searching */}
            {!isSearching && (
              <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                {/* Previous Button */}
                <button
                  onClick={goToPrevious}
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%'
                  }}
                  aria-label="Previous events"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Next Button */}
                <button
                  onClick={goToNext}
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%'
                  }}
                  aria-label="Next events"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Progress Indicator - Hidden when searching */}
            {!isSearching && (
              <div className="mt-3">
                <div 
                  className="progress mx-auto" 
                  style={{ height: '4px', maxWidth: '300px' }}
                >
                  <div
                    className="progress-bar bg-primary"
                    style={{
                      width: `${((translateX % (events.length * cardWidth)) / (events.length * cardWidth)) * 100}%`,
                      transition: 'width 0.1s linear'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="text-secondary mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="h5 fw-semibold text-dark mb-2">
              {isSearching ? 'No events found' : 'No events available'}
            </h3>
            <p className="text-secondary">
              {isSearching 
                ? 'Try adjusting your search terms or browse all events'
                : 'Check back later for new events'
              }
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .btn:hover {
          transform: scale(1.05);
          transition: transform 0.2s ease;
        }
        
        .progress-bar {
          transition: width 0.1s linear;
        }

        @media (max-width: 768px) {
          .container-fluid {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default EventsSection;