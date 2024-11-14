import React from 'react';
import BookGrid from './BookGrid';
import { useBookContext } from '../contexts/BookContext';
import '../styles/components/Favorites.css';

const Favorites = () => {
  const { favorites } = useBookContext();

  // Debugging: Log favorite books to verify cover_id presence
  console.log('Favorite Books:', favorites);

  return (
    <div className="main-content">
      <div className="favorites-header">
        <h1 className="favorites-title">Your Favorites</h1>
        <p className="favorites-subtitle">Books you've marked as favorites.</p>
      </div>
      {favorites.length > 0 ? (
        <BookGrid books={favorites} />
      ) : (
        <div className="empty-favorites">
          <div className="empty-favorites-icon">📚</div>
          <h2 className="empty-favorites-text">No Favorites Yet!</h2>
          <p className="empty-favorites-subtext">
            Browse through our collection and add your favorite books to this list.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
