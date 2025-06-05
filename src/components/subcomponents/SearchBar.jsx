import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <section className="py-5 bg-white border-bottom">
      <div className="container px-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary">
                <Search size={20} />
              </span>
              <input
                type="text"
                placeholder="Search events by name, location, or description..."
                className="form-control ps-5 py-3"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;