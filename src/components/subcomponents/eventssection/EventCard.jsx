import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleRegister = (eventName) => {
    alert(`Registration for "${eventName}" - Feature coming soon!`);
  };

  return (
    <div className="card shadow-lg h-100">
      <div className="position-relative" style={{ height: '200px', backgroundColor: '#e9ecef' }}>
        <img
          src={event.image}
          alt={event.name}
          className="card-img-top h-100 object-fit-cover"
          style={{ objectFit: 'cover', minHeight: '200px' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=Event+Image';
          }}
        />
        <div className="position-absolute top-0 start-0 m-3">
          <span className="badge bg-primary text-white px-3 py-2 fs-6">
            {event.category}
          </span>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column">
        <h3 className="card-title fs-5 fw-bold mb-3" style={{ minHeight: '3em' }}>
          {event.name}
        </h3>
        
        <ul className="list-unstyled mb-3">
          <li className="d-flex align-items-center text-secondary mb-2">
            <Calendar size={16} className="me-2" />
            <span className="small">
              {formatDate(event.date)} at {formatTime(event.time)}
            </span>
          </li>
          <li className="d-flex align-items-center text-secondary">
            <MapPin size={16} className="me-2" />
            <span className="small">{event.location}</span>
          </li>
        </ul>
        
        <p className="card-text text-secondary small mb-4" style={{ minHeight: '4em' }}>
          {event.description}
        </p>
        
        <button 
          onClick={() => handleRegister(event.name)}
          className="btn btn-primary w-100 mt-auto d-flex align-items-center justify-content-center fw-semibold"
        >
          <Users size={16} className="me-2" />
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;