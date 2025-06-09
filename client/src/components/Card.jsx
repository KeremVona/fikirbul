import React, { useState, useEffect } from "react";

export default function Card({
  title = "SaaS Fikri Başlığı",
  shortIntro,
  description,
  revenue = "₺10.000/ay",
  buildTime = "2 hafta",
  users = 120,
  categories = [],
  index,
}) {
  // description öncelik sırası: description prop'u > shortIntro prop'u > varsayılan metin
  const displayDescription =
    description ||
    shortIntro ||
    "Kısa bir açıklama bu fikrin neyle ilgili olduğunu özetler.";

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedIdeas = JSON.parse(localStorage.getItem("savedIdeas") || "[]");
    setSaved(savedIdeas.includes(title));
  }, [title]);

  const handleSave = (e) => {
    e.preventDefault(); // Prevent navigation if inside a Link
    let savedIdeas = JSON.parse(localStorage.getItem("savedIdeas") || "[]");
    if (saved) {
      savedIdeas = savedIdeas.filter((t) => t !== title);
    } else {
      savedIdeas.push(title);
    }
    localStorage.setItem("savedIdeas", JSON.stringify(savedIdeas));
    setSaved(!saved);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-3 w-full max-w-sm transition-shadow hover:shadow-xl hover:scale-[1.03] duration-200 ease-in-out relative transform"
      style={{ willChange: "transform" }}
    >
      <button
        onClick={handleSave}
        className={`absolute top-4 right-4 z-10 rounded-full p-2 border transition bg-white shadow-sm hover:bg-indigo-50 active:scale-90 duration-150 ease-in-out ${
          saved
            ? "text-indigo-600 border-indigo-400"
            : "text-gray-400 border-gray-200"
        }`}
        aria-label={saved ? "Kaydedildi" : "Kaydet"}
        style={{ willChange: "transform" }}
      >
        {saved ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-5 h-5"
          >
            <path d="M5 3a2 2 0 0 0-2 2v12l7-4 7 4V5a2 2 0 0 0-2-2H5z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3a2 2 0 0 0-2 2v12l7-4 7 4V5a2 2 0 0 0-2-2H5z"
            />
          </svg>
        )}
      </button>
      <div className="font-bold text-lg text-gray-900 mb-1 truncate">
        {title}
      </div>
      <div className="flex flex-wrap gap-1 mb-1">
        {categories.map((cat) => (
          <span
            key={cat}
            className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100"
          >
            {cat}
          </span>
        ))}
      </div>
      <div className="text-gray-600 text-sm mb-2 line-clamp-2">
        {displayDescription}
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-gray-700 mt-auto">
        <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-semibold">
          Gelir: {revenue}
        </span>
        <span className="bg-green-50 text-green-600 px-2 py-1 rounded font-semibold">
          Yapım Süresi: {buildTime}
        </span>
        <span className="bg-yellow-50 text-yellow-600 px-2 py-1 rounded font-semibold">
          Kullanıcı: {users}
        </span>
      </div>
    </div>
  );
}
