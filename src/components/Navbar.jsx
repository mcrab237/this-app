import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/Navbar.css';
import { useBookContext } from '../contexts/BookContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { favorites } = useBookContext();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-logo">BookHaven</span>
        </NavLink>
        <div className="navbar-nav">
          <NavLink to="/" className="nav-link" end>
            Home
          </NavLink>
          <NavLink to="/favorites" className="nav-link">
            Favorites
            {favorites.length > 0 && (
              <span className="favorite-count">{favorites.length}</span>
            )}
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;