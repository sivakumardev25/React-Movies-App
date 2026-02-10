import { useState, useEffect } from "react";
import { MovieDetails as fetchMovie } from "../api";
import { useParams, useNavigate } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, SetMovie] = useState(null); //store the fetch movie details
  const [error, setError] = useState(null); //handle the error when fetched data

  // fetch the movieDeatils from the api

  useEffect(() => {
    const MovieDetail = async () => {
      try {
        const data = await fetchMovie(id);
        SetMovie(data);
      } catch (error) {
        setError("Error fetching movie details:", error);
      }
    };
    MovieDetail();
  }, [id]);

  // condition if data loading
  if (!movie) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-red-600 leading-relaxed font-[Georgia]">
          Data is Loading... Please wait
        </h1>
      </div>
    );
  }
  if (error) {
    return <h1 className="text-2xl">Error loading the details</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6 bg-gradient-to-r from-teal-700 via-teal-400 to-teal-500">
     {/* go back button */}
      <span>
        <button
          onClick={() => navigate(-1)}
          className="px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </span>
     {/* movie poster */}
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.Title}
        className="w-72 rounded-lg shadow-md mx-auto md:mx-0"
      />
     {/* movie details */}
      <div className="mt-4 ms-4 flex-1">
        <h1 className="text-4xl font-bold text-gray-800 font-serif mb-5">
          {movie.Title}
        </h1>

        <p className="mt-3 text-xl font-semibold text-black font-[Georgia]">
          <span className="font-semibold text-2xl text-red-800">Year:</span>{" "}
          {movie.Year}
        </p>
        <p className="mt-3 text-xl font-semibold text-black font-[Georgia,serif]">
          <span className="font-semibold text-2xl text-red-800">Plot:</span>{" "}
          {movie.Plot}
        </p>

        <p className="mt-3 text-xl font-semibold text-black leading-relaxed font-[Georgia]">
          <span className="font-semibold text-2xl text-red-800">Actors:</span>{" "}
          {movie.Actors}
        </p>
        <p className="mt-3 text-xl font-semibold text-black font-[Georgia]">
          <span className="font-semibold text-2xl text-red-800">Genre: </span>
          {movie.Genre}
        </p>
        <p className="mt-3 text-xl font-semibold text-black font-[Georgia]">
          <span className="font-semibold text-2xl text-red-800">
            IMDB Rating:{" "}
          </span>
          {movie.imdbRating}
        </p>
      </div>
    </div>
  );
}
export default MovieDetail;
