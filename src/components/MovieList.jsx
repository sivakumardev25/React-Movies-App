import { Link } from "react-router-dom";

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <h1 className="text-2xl text-center font-bold text-red-700 font-[Georgia] p-10">
        Searched Movie is not found, please Search again...
      </h1>
    );
  }

  return (
    // grid layout for the movie list
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 ">
      {movies.map((movie) => (
        <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
        {/* card for each movie */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
        
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450"
              }
              alt={movie.Title}
              className="w-full h-96 object-fit"
            />

            <div className="bg-gradient-to-r from-violet-300 via-sky-600 to-violet-700 text-center p-4">
              <h2 className="font-bold font-serif text-xl text-gray-800">
                {movie.Title}
              </h2>
              <h3 className="text-2xl font-serif ">{movie.Year}</h3>

              <span className="inline-block mt-1 text-md bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded capitalize">
                {movie.Type}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MovieList;
