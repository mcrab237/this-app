import React, { createContext, useState, useContext, useEffect } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Retrieve favorites from localStorage for persistence
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Update localStorage whenever favorites change
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (book) => {
    setFavorites((prev) => {
      if (!prev.find((fav) => fav.key === book.key)) {
        return [...prev, book];
      }
      return prev;
    });
  };

  const removeFromFavorites = (bookId) => {
    setFavorites((prev) => prev.filter((book) => book.key !== bookId));
  };

  return (
    <BookContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
