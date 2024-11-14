import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="button button-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound; 