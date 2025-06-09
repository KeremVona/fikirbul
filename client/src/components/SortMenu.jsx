import React from "react";

const sortOptions = [
  { label: "Gelir (Artan)", value: "revenue-asc" },
  { label: "Gelir (Azalan)", value: "revenue-desc" },
  { label: "Yapım Süresi (Kısa-uzun)", value: "buildtime-asc" },
  { label: "Yapım Süresi (Uzun-kısa)", value: "buildtime-desc" },
  { label: "Kullanıcı (Artan)", value: "users-asc" },
  { label: "Kullanıcı (Azalan)", value: "users-desc" },
];

export default function SortMenu({ sort, setSort }) {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 mb-4">
      <label className="text-sm font-medium text-gray-700">Sırala:</label>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
