// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookProvider } from "./contexts/BookContext";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Favorites from "./components/Favorites";
import NotFound from "./components/NotFound";
import "./index.css";

const App = () => {
  return (
    <BookProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
};

export default App;
