import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";

import { SearchMovie } from "./api";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import MovieDetail from "./components/MovieDetail";
import MovieList from "./components/MovieList";
import Pagination from "./components/Pagination";
// import Favourite from "./components/Favourite";

function App() {
  const [movies, setMovies] = useState([]); //state to store the movies fetch the Api
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(""); //eeror message during the api call
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState(""); //filter applied to movie list
  // const [favourite, setFavourite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isSearched, setIsSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isDetailPage = useLocation().pathname.startsWith("/movie/");

  // const moviesPerPage = 5;

  // handleSearch
  const fetchMovies = useCallback(
    async (term, page = 1, userSearch = false) => {
      try {
        setLoading(true);

        if (userSearch) {
          setIsSearched(true);
          setSearchTerm(term);
          setCurrentPage(1);
          page = 1; // reset to first page for new search
        }

        const data = await SearchMovie(term || "Movies", filter, page);

        if (data.Response === "False") {
          setMovies([]);
          setTotalResults(0);
          return;
        }

        setMovies(data.Search || []);
        setTotalResults(Number(data.totalResults) || 0);
      } catch (error) {
        setError("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    },
    [filter],
  );

  // load default movies by calling the handleSearch
  useEffect(() => {
    fetchMovies(searchTerm || "Movies", currentPage);
  }, [searchTerm, currentPage, fetchMovies]);

  // Handle Search
  const handleSearch = (term) => {
    fetchMovies(term, 1, true);
  };

  // filter the movies
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
    // handleSearch(searchTerm || "Movies", false);
  };

  //Handle Pagination
  // const totalPages = Math.ceil(movies.length / moviesPerPage);
  const totalPages = Math.max(1, Math.ceil(totalResults / 10));

  // update the current page state when pagination button is clicked
  const handlePagination = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // calculate the current movies to dispaly
  // const indexOfLastMovie = currentPage * moviesPerPage;
  // const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  // const currentMovies = movies;
  // const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  //contains all the page numbers for the pagination button
  // const paginationNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   paginationNumbers.push(i);
  // }

  // condition if data is loading

  if (loading) {
    return (
      <h1 className="text-2xl font-semibold text-gray-700 text-center font-[Georgia] mt-10">
        🎬 Loading Movies Please wait...
      </h1>
    );
  }

  // condition if error
  if (error) {
    return <h1 className="text-2xl font-bold">Error: {error}</h1>;
  }

  return (
    <>
      {/* header */}
      <header className="sticky top-0 bg-gray-400 backdrop-blur-md shadow-md font-bold bg-gradient-to-r from-rose-200 via-violet-500 to-blue-400 items-center flex flex-wrap gap-5 justify-between p-5 mb-10 z-50">
        {/* bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 */}
        <Link
          to="/"
          className="text-3xl md:text-4xl font-extrabold text-gray-800 "
        >
          The Movie Application{" "}
        </Link>
        <SearchBar onSearch={handleSearch} disabled={isDetailPage} />
        <div className="flex flex-wrap gap-5 justify-between">
          <FilterDropdown onFilterChange={handleFilterChange} value={filter} />
        </div>
      </header>

      {/* main content */}
      <main>
        <div className="mx-10">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {isSearched && searchTerm.toLowerCase() !== "movies" && (
                    <button
                      onClick={() => {
                        setIsSearched(false);
                        setSearchTerm("");
                        handleSearch("movies", 1);
                      }}
                      className="mb-4 px-4 py-2 bg-gray-600 text-white rounded"
                    >
                      Go Back
                    </button>
                  )}

                  <MovieList movies={movies} />

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePagination={handlePagination}
                  />
                </>
              }
            />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
export default App;
