import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import MovieDetail from "./components/MovieDetail";
import MovieList from "./components/MovieList";
import Favourite from "./components/Favourite";

import { SearchMovie } from "./api";

function App() {
  const [movies, setMovies] = useState([]); //state to store the movies fetch the Api
  const [error, setError] = useState(null); //eeror message during the api call
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(""); //filter applied to movie list
  const [favourite, setFavourite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // const [hasSearched, setHasSearched] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");

  const moviesPerPage = 5;

  // handleSearch
  const handleSearch = useCallback(
    async (searchTerm) => {
      try {
        const data = await SearchMovie(searchTerm, filter);
        setMovies(data.Search || []);
      } catch (error) {
        setError("Error fetching movies:", error.message);
      } finally {
        setLoading(false);
      }
    },
    [filter],
  );

  // load default movies by calling the handleSearch
  useEffect(() => {
    const loadDefaultMovies = async () => {
      await handleSearch("Movies");
    };
    loadDefaultMovies();
  }, [handleSearch]);

  // filter the movies
  const handleFilterChange = (filter) => {
    setFilter(filter);
    // handleSearch(searchTerm);
  };

  // update the current page state
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // calculate the current movies to dispaly
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  //display total page
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  //contains all the page numbers for the pagination button
  const paginationNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  // condition if data is loading
  if (loading) {
    return (
      <h1 className="text-4xl font-bold text-red-600 font-[Georgia]">
        Data is loading Please wait......
      </h1>
    );
  }

  // condition if error
  if (error) {
    return <h1 className="text-2xl font-bold">Error: {error}</h1>;
  }

  return (
    <Router>
      <header className="sticky top-0 bg-gray-400 backdrop-blur-md shadow-md  bg-gradient-to-r from-rose-200 via-violet-500 to-blue-400 items-center flex flex-wrap gap-5 justify-between p-5 mb-10 z-50">
        <Link  to ="/" className="text-3xl md:text-4xl font-extrabold text-gray-800 ">
          The Movie Application{" "}
        </Link>
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-wrap gap-5 justify-between">
          <FilterDropdown onFilterChange={handleFilterChange} />
        </div>
      </header>

      <main>
        <div className="mx-10">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <MovieList movies={currentMovies} />
                  {/* Pagination */}
                  <div className="flex justify-center flex-wrap gap-2 mt-10">
                    {paginationNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => handlePagination(pageNumber)}
                        className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-300 mb-10 ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white shadow-lg scale-105"
                            : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>
                </>
              }
            />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
