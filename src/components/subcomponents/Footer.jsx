import React from 'react';
import { Calendar } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Events', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  return (
    <footer className="bg-dark text-light py-5">
      <div className="container px-4">
        <div className="row gy-4">
          {/* Company Info */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex align-items-center justify-content-center bg-primary rounded me-3" style={{ width: 32, height: 32 }}>
                <Calendar size={20} color="#fff" />
              </div>
              <span className="fs-5 fw-bold">EventHub</span>
            </div>
            <p className="text-secondary mb-0">
              Connecting communities through amazing local events.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-4">
            <h4 className="fs-6 fw-semibold mb-3">Quick Links</h4>
            <ul className="list-unstyled mb-0">
              {quickLinks.map((link) => (
                <li key={link.name} className="mb-2">
                  <a 
                    href={link.href} 
                    className="link-light text-decoration-none"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-4">
            <h4 className="fs-6 fw-semibold mb-3">Contact Info</h4>
            <div className="text-secondary">
              <p className="mb-2">hello@eventhub.com</p>
              <p className="mb-0">(555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-top border-secondary mt-5 pt-4 text-center text-secondary">
          <p className="mb-0">&copy; {currentYear} EventHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;