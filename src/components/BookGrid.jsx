import React from 'react';
import BookCard from './BookCard';
import '../styles/components/BookGrid.css';

const BookGrid = ({ books }) => {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
};

export default BookGrid; 