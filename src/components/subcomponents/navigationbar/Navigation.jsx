import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#', active: true },
    { name: 'Events', href: '#', active: false },
    { name: 'Contact', href: '#', active: false }
  ];

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow sticky-top">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href='public/logo.png'>
          <span className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle me-2" style={{ width: 44, height: 44, overflow: 'hidden' }}>
            <img
      src="/logo.png"
      alt="logo"
      className="img-fluid"
      style={{ width: 44, height: 44, objectFit: 'contain' }}
    />
          </span>
          <span className="fs-4 fw-bold text-dark">EventHub</span>
        </a>

        {/* Mobile menu button */}
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop Navigation */}
        <div className="collapse navbar-collapse d-none d-md-flex">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.name}>
                <a
                  href={link.href}
                  className={`nav-link${link.active ? ' active text-primary fw-semibold' : ''}`}
                  aria-current={link.active ? 'page' : undefined}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </nav>
  );
};

export default Navigation;