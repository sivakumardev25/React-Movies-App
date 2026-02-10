import { useState } from "react";

function SearchBar({ onSearch, disabled }) {
  const [searchTerm, setSearchTerm] = useState("");

  // handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    onSearch(searchTerm);
  };

  return (
    // search bar
    <form onSubmit={handleSearch}>
      {/* search input */}
      <input
        type="text"
        placeholder="Search your Movie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={disabled}
        className="border outline-none rounded px-4 p-2 text-black w-60 disabled:bg-gray-300 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={disabled}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-medium rounded-md text-center text-xl px-4 py-2 ms-10"
      >
        {" "}
        Search{" "}
      </button>
    </form>
  );
}
export default SearchBar;
