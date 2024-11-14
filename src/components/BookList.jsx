import React, { useState, useEffect } from "react";
import BookGrid from "./BookGrid";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import "../styles/components/BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("science_fiction");

  const genres = [
    { id: "science_fiction", name: "Science Fiction" },
    { id: "fantasy", name: "Fantasy" },
    { id: "mystery", name: "Mystery" },
    { id: "romance", name: "Romance" },
  ];

  useEffect(() => {
    fetchBooks();
    // Scroll to top on genre change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedGenre]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://openlibrary.org/subjects/${selectedGenre}.json?limit=20`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setBooks(data.works);
      setLoading(false);
    } catch (err) {
      setError("Unable to fetch books at this time.");
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">Discover Books</h1>
        <div className="genre-filter">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`button ${
                selectedGenre === genre.id
                  ? "button-primary"
                  : "button-secondary"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      <BookGrid books={books} />
    </div>
  );
};

export default BookList;
