function Pagination({ currentPage, totalPages, handlePagination }) {
  return (
    <div className="flex justify-center items-center gap-3 mt-10 mb-10">
      {/* Prev Button */}
      <button
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-semibold ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {"<"}
      </button>

      {/* Current Page Number */}
      <span className="px-5 py-2 bg-gray-200 rounded-lg font-bold">
        {currentPage}
      </span>

      {/* Next Button */}
      <button
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-semibold ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {">"}
      </button>
    </div>
  );
}
export default Pagination;
