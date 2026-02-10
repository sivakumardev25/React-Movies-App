import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import MovieDetail from "./components/MovieDetail";
import MovieList from "./components/MovieList";
import Pagination from "./components/Pagination";
// import Favourite from "./components/Favourite";

import { SearchMovie } from "./api";

function App() {
  const [movies, setMovies] = useState([]); //state to store the movies fetch the Api
  const [error, setError] = useState(null); //eeror message during the api call
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState(""); //filter applied to movie list
  // const [favourite, setFavourite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isSearched, setIsSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isDetailPage = useLocation().pathname.startsWith("/movie/");

  const moviesPerPage = 5;

  // handleSearch
  const handleSearch = useCallback(
    async (searchTerm, userSearch = true) => {
      try {
        setLoading(true);

        if (userSearch) {
          setIsSearched(true);
          setSearchTerm(searchTerm);
        }

        const data = await SearchMovie(searchTerm, filter);
        setMovies(data.Search || []);
        setCurrentPage(1);
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
    const loadDefaultMovies = async () => {
      await handleSearch("Movies");
    };
    loadDefaultMovies();
  }, [handleSearch]);

  // filter the movies
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    handleSearch(searchTerm || "Movies", false);
  };

  // update the current page state when pagination button is clicked
  const handlePagination = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // calculate the current movies to dispaly
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  //display total page
  // const totalPages = Math.ceil(movies.length / moviesPerPage);
  const totalPages = Math.max(1, Math.ceil(movies.length / moviesPerPage));

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
    <>
      {/* header */}
      <header className="sticky top-0 bg-gray-400 backdrop-blur-md shadow-md  bg-gradient-to-r from-rose-200 via-violet-500 to-blue-400 items-center flex flex-wrap gap-5 justify-between p-5 mb-10 z-50">
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
                        handleSearch("movies", false);
                      }}
                      className="mb-4 px-4 py-2 bg-gray-600 text-white rounded"
                    >
                      Go Back
                    </button>
                  )}

                  <MovieList movies={currentMovies} />

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
