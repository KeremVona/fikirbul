import React, { useState } from "react";

export default function Pagination({ data, renderCard, cardsPerPage = 8 }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / cardsPerPage);

  const startIdx = (page - 1) * cardsPerPage;
  const endIdx = startIdx + cardsPerPage;
  const currentCards = data.slice(startIdx, endIdx);

  function goToPage(p) {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-6 justify-center mb-8">
        {currentCards.map(renderCard)}
      </div>
      <nav className="flex justify-center items-center gap-2 mb-8">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded border text-sm font-medium transition ${
            page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
          }`}
        >
          Önceki
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded border text-sm font-medium transition ${
              page === i + 1
                ? "bg-indigo-500 text-white border-indigo-500 shadow"
                : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
            }`}
            aria-current={page === i + 1 ? "page" : undefined}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded border text-sm font-medium transition ${
            page === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
          }`}
        >
          Sonraki
        </button>
      </nav>
    </div>
  );
}
