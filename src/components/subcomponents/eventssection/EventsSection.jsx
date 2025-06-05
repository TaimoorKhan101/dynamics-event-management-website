import React from 'react';
import { Search } from 'lucide-react';
import EventCard from './EventCard';
import LoadingSpinner from './LoadingSpinner';

const EventsSection = ({ events, loading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-5">
      <div className="container px-4">
        <div className="text-center mb-4">
          <h2 className="display-6 fw-bold text-dark mb-3">
            Featured Events
          </h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: 600 }}>
            Don't miss out on these exciting upcoming events in your area
          </p>
        </div>

        {events.length > 0 ? (
          <div className="row g-4">
            {events.map((event) => (
              <div className="col-12 col-md-6 col-lg-4 d-flex" key={event.id}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="text-secondary mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="h5 fw-semibold text-dark mb-2">No events found</h3>
            <p className="text-secondary">
              Try adjusting your search terms or browse all events
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;