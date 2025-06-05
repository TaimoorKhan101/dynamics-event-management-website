import React from 'react';

const LoadingSpinner = () => {
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
        
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSpinner;