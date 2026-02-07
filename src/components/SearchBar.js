import { useState } from "react";
function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search your Movie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border outline-none rounded px-4 p-2 text-black w-60"
      />
      <button
        type="submit"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-medium rounded-md text-center text-xl px-4 py-2 ms-10"
      >
        {" "}
        Search{" "}
      </button>
    </form>
  );
}
export default SearchBar;
