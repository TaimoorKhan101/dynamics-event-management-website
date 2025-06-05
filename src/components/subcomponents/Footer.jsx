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
              <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle me-3" style={{ width: 44, height: 44, overflow: 'hidden' }}>
                <img
      src="/logo.png"
      alt="logo"
      className="img-fluid"
      style={{ width: 44, height: 44, objectFit: 'contain' }}
    />
              </div>
              <span className="fs-5 fw-bold">EventHub</span>
            </div>
            <p className="text-secondary mb-0">
              If you want to organize an event or having problem with registering you may contact our team for any questions or queries. We will be pleased to assist you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-4 d-flex flex-column align-items-md-center">
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
              <p className="mb-2">3tk2021@gmail.com</p>
              <p className="mb-0">+92 313 0123456</p>
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