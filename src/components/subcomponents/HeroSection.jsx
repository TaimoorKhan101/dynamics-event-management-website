import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-primary bg-gradient text-white py-5">
      <div className="container text-center">
        <h1 className="display-4 fw-bold mb-4">
          Discover Events Near You
        </h1>
        <p className="lead text-light mx-auto" style={{ maxWidth: 700 }}>
          Find amazing local events, connect with your community, and create unforgettable memories
        </p>
      </div>
    </section>
  );
};

export default HeroSection;