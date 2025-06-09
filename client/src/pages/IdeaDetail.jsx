import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ideaDetails } from "../data/ideaDetails";
import { XCircle, Bookmark } from "lucide-react";
import Navbar from "../components/Navbar";

export default function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idea = ideaDetails[parseInt(id, 10)];
  const [saved, setSaved] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync saved state with localStorage
  useEffect(() => {
    const savedIdeas = JSON.parse(localStorage.getItem("savedIdeas") || "[]");
    setSaved(savedIdeas.includes(idea?.title));
  }, [idea?.title]);

  // Save/Unsave handler
  function handleSave(e) {
    e.preventDefault();
    let savedIdeas = JSON.parse(localStorage.getItem("savedIdeas") || "[]");
    if (saved) {
      savedIdeas = savedIdeas.filter((t) => t !== idea.title);
    } else {
      savedIdeas.push(idea.title);
    }
    localStorage.setItem("savedIdeas", JSON.stringify(savedIdeas));
    setSaved(!saved);
  }

  if (!idea) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center text-gray-500">
        Fikir bulunamadı.
        <button
          className="block mt-6 text-indigo-600 underline"
          onClick={() => navigate(-1)}
        >
          Geri Dön
        </button>
      </div>
    );
  }

  const {
    title,
    shortIntro,
    whatItDoes,
    stats,
    founderStory,
    features,
    userReviews,
    links,
    categories,
    summary,
  } = idea;

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-4 md:p-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mt-6 relative">
          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`absolute top-6 right-6 z-10 rounded-full p-3 border transition bg-white shadow-sm hover:bg-indigo-50 active:scale-90 duration-150 ease-in-out group ${
              saved
                ? "text-indigo-600 border-indigo-400"
                : "text-gray-400 border-gray-200"
            }`}
            aria-label={saved ? "Kaydedildi" : "Kaydet"}
            title={saved ? "Kaydedilenlerden kaldır" : "Fikri kaydet"}
            style={{ willChange: "transform" }}
          >
            <span className="sr-only">{saved ? "Kaydedildi" : "Kaydet"}</span>
            <Bookmark
              className={`w-6 h-6 transition-transform duration-200 ${
                saved ? "scale-110" : "scale-100"
              }`}
              fill={saved ? "#6366f1" : "none"}
              stroke={saved ? "#6366f1" : "currentColor"}
            />
          </button>

          <button
            className="mb-6 text-indigo-600 hover:underline text-sm"
            onClick={() => navigate(-1)}
          >
            ← Geri Dön
          </button>
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{title}</h1>

          {/* 🌟 Kısa Tanıtım */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-1">🌟 Kısa Tanıtım</h2>
            <p className="text-gray-700 leading-relaxed">{shortIntro}</p>
          </section>

          {/* 🧠 Ürün Ne İşe Yarar? */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-1">
              🧠 Ürün Ne İşe Yarar?
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              {whatItDoes.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* 📊 Temel İstatistikler */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-1">
              📊 Temel İstatistikler
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              {stats.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* 👥 Kurucu Hikayesi */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-1">👥 Kurucu Hikayesi</h2>
            <ul className="list-disc pl-6 text-gray-700">
              {founderStory.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* ✔️ Öne Çıkan Özellikler */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-1">
              ✔️ Öne Çıkan Özellikler
            </h2>
            <ul className="list-decimal pl-6 text-gray-700">
              {features.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* ❤️ Kullanıcı Yorumları */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-1">
              ❤️ Kullanıcı Yorumları
            </h2>
            <ul className="pl-0 text-gray-700">
              {userReviews.map((review, idx) => (
                <li
                  key={idx}
                  className="mb-2 border-l-4 border-indigo-200 pl-3"
                >
                  <span className="font-semibold text-indigo-700">
                    {review.name}:
                  </span>{" "}
                  {review.comment}
                </li>
              ))}
            </ul>
          </section>

          {/* 🔗 Faydalı Bağlantılar */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-1">
              🔗 Faydalı Bağlantılar
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              {links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* 🗂 Kategoriler ve Etiketler */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-1">
              🗂 Kategoriler ve Etiketler
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100"
                >
                  {cat}
                </span>
              ))}
            </div>
          </section>

          {/* ✅ Özet */}
          <section>
            <h2 className="text-lg font-semibold mb-1">✅ Özet</h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        </div>
      </div>
    </>
  );
}
