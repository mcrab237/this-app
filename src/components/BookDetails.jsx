// components/BookDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBookContext } from "../contexts/BookContext";
import "../styles/components/BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, addToFavorites, removeFromFavorites } = useBookContext();

  useEffect(() => {
    fetchBookDetails();
    // Scroll to top when navigating to details
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`https://openlibrary.org/works/${id}.json`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setBook(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch book details:", err);
      setLoading(false);
    }
  };

  const isFavorite = favorites.some((fav) => fav.key === book?.key);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!book) return <div className="error-message">Book not found.</div>;

  return (
    <div className="book-details">
      <div className="book-details-cover">
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers?.[0]}-L.jpg`}
          alt={book.title}
          onError={(e) => {
            e.target.src = "/images/book-placeholder.jpg";
          }}
        />
      </div>

      <div className="book-details-info">
        <div className="book-details-header">
          <h1 className="book-details-title">{book.title}</h1>
          <p className="book-details-author">
            By {book.authors?.[0]?.name || "Unknown Author"}
          </p>
        </div>

        <div className="book-details-meta">
          {book.first_publish_date && (
            <div className="meta-item">
              <span className="meta-label">First Published</span>
              <span className="meta-value">{book.first_publish_date}</span>
            </div>
          )}
          {book.subjects && (
            <div className="meta-item">
              <span className="meta-label">Genres</span>
              <span className="meta-value">{book.subjects.join(', ')}</span>
            </div>
          )}
          {book.languages && (
            <div className="meta-item">
              <span className="meta-label">Languages</span>
              <span className="meta-value">
                {book.languages.map(lang => lang.key.split('/').pop()).join(', ')}
              </span>
            </div>
          )}
        </div>

        <div className="book-details-description">
          <p>
            {book.description?.value ||
              book.description ||
              "No description available."}
          </p>
        </div>

        <div className="action-buttons">
          <button
            onClick={() =>
              isFavorite ? removeFromFavorites(book.key) : addToFavorites(book)
            }
            className={`button ${
              isFavorite ? "button-secondary" : "button-primary"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;