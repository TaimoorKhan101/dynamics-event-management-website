import React from 'react';

const MobileMenu = ({ isOpen, onClose, navLinks }) => {
  if (!isOpen) return null;

  return (
    <div className="d-md-none">
      <div className="bg-white border-top border-secondary px-2 pt-2 pb-3">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={onClose}
            className={`nav-link px-3 py-2 fs-5 rounded ${
              link.active
                ? 'active text-primary bg-light fw-semibold'
                : 'text-dark'
            }`}
            style={link.active ? { fontWeight: 600 } : {}}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;