import axios from "axios";

const API_KEY = "d8048d46";
const API_URL = "https://www.omdbapi.com/";

// function to search movies based on the search term and type (movie, series, episode)
export const SearchMovie = async (searchTerm, type = "") => {
  try {
    const response = await axios.get(
      `${API_URL}?s=${searchTerm}&type=${type}&apikey=${API_KEY}`,
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching movies:", error);
    return searchTerm ? { Search: [] } : [];
  }
};

// function to fetch movie details based on the movie name or id
export const MovieDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}?i=${id}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    return [];
  }
};
