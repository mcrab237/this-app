import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/BookGrid.css';

const BookCard = ({ book }) => {
  const bookId = book.key.split('/').pop();
  
  // Determine the cover ID from available fields
  const coverId = book.cover_id || (book.covers && book.covers[0]) || null;
  
  return (
    <Link to={`/book/${bookId}`} className="book-card" aria-label={`View details for ${book.title}`}>
      <div className="book-cover">
        {coverId ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
            alt={book.title}
            loading="lazy"
            onError={(e) => {
              e.target.src = '/images/book-placeholder.jpg';
            }}
          />
        ) : (
          <img
            src="/images/book-placeholder.jpg"
            alt={`${book.title} cover placeholder`}
          />
        )}
      </div>
      <div className="book-info">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-author">
          {book.authors?.[0]?.name || 'Unknown Author'}
        </p>
        <div className="book-meta">
          <span>{book.first_publish_date || 'N/A'}</span>
          <span>•</span>
          <span>{book.subject?.[0] || 'Fiction'}</span>
        </div>
      </div>
    </Link>
  );
};


export default BookCard