import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import { ideaDetails } from "../data/ideaDetails";
import { Search, SlidersHorizontal, Filter, XCircle } from "lucide-react";

// Helper functions for filtering
function parseRevenue(revenueStr) {
  if (!revenueStr || typeof revenueStr !== "string") return 0;
  const match = revenueStr.match(/([\d.]+)/g);
  if (!match) return 0;
  return parseInt(match.join("").replace(/\./g, ""), 10);
}
function parseUsers(users) {
  return typeof users === "number" ? users : parseInt(users, 10);
}

const categories = [
  "Finans",
  "Eğitim",
  "Pazarlama",
  "Takım",
  "Abonelik",
  "İçerik",
  "Sözleşme",
  "Yapay Zeka",
  "Video",
  "Lead Generation",
  "E-posta Kazıma",
  "3B İkon",
  "AI İllüstrasyon",
  "Tasarım Kaynağı",
  "AI Recruiting",
  "Video Mülakat",
  "HR Teknolojisi",
  "Sosyal Medya Planlama",
  "Zaman Yönetimi",
  "Ekip Araçları",
  "Verimlilik",
  "Podcast",
  "Sosyal Medya Araçları",
  "AI Tools",
  "SaaS",
  "Entrepreneurship",
  "Market Research",
  "Emlak",
  "Ev Satın Alma",
  "Fintech",
  "CRM",
  "LinkedIn",
  "Ağ Yönetimi",
  "İş Birliği",
];

const ideas = ideaDetails;

export default function IdeaList() {
  const [search, setSearch] = useState("");
  const [revenue, setRevenue] = useState("all");
  const [buildTime, setBuildTime] = useState("all");
  const [userCount, setUserCount] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sort, setSort] = useState("revenue-desc");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const maxVisible = 8;
  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, maxVisible);

  const filteredIdeas = useMemo(() => {
    let result = ideas.filter((idea) => {
      // Search filter
      const titleStr = idea.title ? idea.title.toLowerCase() : "";
      const descStr = idea.description ? idea.description.toLowerCase() : "";
      const searchStr = search ? search.toLowerCase() : "";
      const searchMatch =
        titleStr.includes(searchStr) || descStr.includes(searchStr);
      // Revenue filter
      let revenueMatch = true;
      const rev = parseRevenue(idea.revenue);
      if (revenue !== "all") {
        if (revenue === "0-10000") revenueMatch = rev >= 0 && rev <= 10000;
        else if (revenue === "10000-50000")
          revenueMatch = rev > 10000 && rev <= 50000;
        else if (revenue === "50000-100000")
          revenueMatch = rev > 50000 && rev <= 100000;
        else if (revenue === "100000+") revenueMatch = rev > 100000;
      }
      // Build time filter
      let buildTimeMatch = true;
      if (buildTime !== "all") {
        buildTimeMatch =
          idea.buildTime.replace(/\s/g, "").toLowerCase() === buildTime;
      }
      // User count filter
      let userMatch = true;
      const u = parseUsers(idea.users);
      if (userCount !== "all") {
        if (userCount === "0-100") userMatch = u >= 0 && u <= 100;
        else if (userCount === "100-1000") userMatch = u > 100 && u <= 1000;
        else if (userCount === "1000-10000") userMatch = u > 1000 && u <= 10000;
        else if (userCount === "10000+") userMatch = u > 10000;
      }
      // Category filter
      let categoryMatch = true;
      if (selectedCategories.length > 0) {
        categoryMatch = selectedCategories.every((cat) =>
          idea.categories.includes(cat)
        );
      }
      return (
        searchMatch &&
        revenueMatch &&
        buildTimeMatch &&
        userMatch &&
        categoryMatch
      );
    });
    // Sorting logic
    return result.sort((a, b) => {
      function parseRevenueNum(str) {
        if (!str || typeof str !== "string") return 0;
        const match = str.match(/([\d.]+)/g);
        if (!match) return 0;
        return parseInt(match.join("").replace(/\./g, ""), 10);
      }
      function parseBuildTime(str) {
        // e.g. "1 ay", "2 hafta", "3 gün" => days
        const s = str.toLowerCase();
        if (s.includes("gün")) return parseInt(s);
        if (s.includes("hafta")) return parseInt(s) * 7;
        if (s.includes("ay")) return parseInt(s) * 30;
        return 0;
      }
      if (sort === "revenue-asc")
        return parseRevenueNum(a.revenue) - parseRevenueNum(b.revenue);
      if (sort === "revenue-desc")
        return parseRevenueNum(b.revenue) - parseRevenueNum(a.revenue);
      if (sort === "buildtime-asc")
        return parseBuildTime(a.buildTime) - parseBuildTime(b.buildTime);
      if (sort === "buildtime-desc")
        return parseBuildTime(b.buildTime) - parseBuildTime(a.buildTime);
      if (sort === "users-asc") return a.users - b.users;
      if (sort === "users-desc") return b.users - a.users;
      return 0;
    });
  }, [search, revenue, buildTime, userCount, selectedCategories, sort]);

  // Category filter bar
  function toggleCategory(cat) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  // Reset filters handler
  function resetFilters() {
    setSearch("");
    setRevenue("all");
    setBuildTime("all");
    setUserCount("all");
    setSelectedCategories([]);
    setSort("revenue-desc");
  }

  return (
    <div className="bg-gray-50 min-h-screen p-0 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Modern Filter/Search/Sort Card */}
        <div className="w-full mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row md:items-end gap-4 md:gap-6 border border-gray-100 transition-all duration-200">
            {/* Search Bar */}
            <div className="flex-1 flex flex-col gap-2">
              <label
                htmlFor="search"
                className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1"
              >
                <Search className="w-4 h-4 text-indigo-400" /> Fikir Ara
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Başlık, açıklama veya anahtar kelime..."
                  className="w-full rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 px-4 py-2 pr-10 text-sm transition placeholder-gray-400 bg-gray-50 hover:bg-white shadow-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition"
                    tabIndex={-1}
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
              {/* Revenue Filter */}
              <div className="flex flex-col gap-1 min-w-[140px]">
                <label className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-400" />{" "}
                  Gelir
                </label>
                <select
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 px-3 py-2 text-sm bg-gray-50 hover:bg-white transition shadow-sm"
                >
                  <option value="all">Tümü</option>
                  <option value="0-10000">0 - 10.000₺</option>
                  <option value="10000-50000">10.000₺ - 50.000₺</option>
                  <option value="50000-100000">50.000₺ - 100.000₺</option>
                  <option value="100000+">100.000₺+</option>
                </select>
              </div>
              {/* Build Time Filter */}
              <div className="flex flex-col gap-1 min-w-[120px]">
                <label className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  <Filter className="w-4 h-4 text-indigo-400" /> Yapım Süresi
                </label>
                <select
                  value={buildTime}
                  onChange={(e) => setBuildTime(e.target.value)}
                  className="rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 px-3 py-2 text-sm bg-gray-50 hover:bg-white transition shadow-sm"
                >
                  <option value="all">Tümü</option>
                  <option value="1gün">1 Gün</option>
                  <option value="3gün">3 Gün</option>
                  <option value="1hafta">1 Hafta</option>
                  <option value="2hafta">2 Hafta</option>
                  <option value="1ay">1 Ay</option>
                  <option value="2ay">2 Ay</option>
                </select>
              </div>
              {/* User Count Filter */}
              <div className="flex flex-col gap-1 min-w-[120px]">
                <label className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  <Filter className="w-4 h-4 text-indigo-400" /> Kullanıcı
                </label>
                <select
                  value={userCount}
                  onChange={(e) => setUserCount(e.target.value)}
                  className="rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 px-3 py-2 text-sm bg-gray-50 hover:bg-white transition shadow-sm"
                >
                  <option value="all">Tümü</option>
                  <option value="0-100">0-100</option>
                  <option value="100-1000">100-1.000</option>
                  <option value="1000-10000">1.000-10.000</option>
                  <option value="10000+">10.000+</option>
                </select>
              </div>
              {/* Reset Filters Button */}
              <div className="flex flex-col gap-1 justify-end">
                <button
                  onClick={resetFilters}
                  className="mt-5 md:mt-0 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-red-50 text-red-500 font-semibold text-xs shadow-sm transition-all duration-150 flex items-center gap-1"
                  type="button"
                >
                  <XCircle className="w-4 h-4" /> Filtreleri Sıfırla
                </button>
              </div>
            </div>
            {/* Sort Dropdown */}
            <div className="flex flex-col gap-1 min-w-[150px]">
              <label className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                <SlidersHorizontal className="w-4 h-4 text-indigo-400" /> Sırala
              </label>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 px-3 py-2 text-sm bg-gray-50 hover:bg-white transition shadow-sm w-full"
                >
                  <option value="revenue-desc">Gelire Göre (Azalan)</option>
                  <option value="revenue-asc">Gelire Göre (Artan)</option>
                  <option value="buildtime-desc">
                    Yapım Süresine Göre (Azalan)
                  </option>
                  <option value="buildtime-asc">
                    Yapım Süresine Göre (Artan)
                  </option>
                  <option value="users-desc">
                    Kullanıcı Sayısına Göre (Azalan)
                  </option>
                  <option value="users-asc">
                    Kullanıcı Sayısına Göre (Artan)
                  </option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <SlidersHorizontal className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {visibleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-4 py-1 rounded-full border text-sm font-medium transition
                ${
                  selectedCategories.includes(cat)
                    ? "bg-indigo-500 text-white border-indigo-500 shadow"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
                }
              `}
            >
              {cat}
            </button>
          ))}
          {categories.length > maxVisible && (
            <button
              onClick={() => setShowAllCategories((v) => !v)}
              className="px-4 py-1 rounded-full border text-sm font-medium bg-gray-100 text-gray-700 border-gray-300 hover:bg-indigo-50 transition"
            >
              {showAllCategories
                ? "Kategorileri Gizle"
                : `Tüm Kategoriler (${categories.length})`}
            </button>
          )}
        </div>
        <Pagination
          data={filteredIdeas}
          renderCard={(idea, i) => (
            <Link
              key={idea.title}
              to={`/idea/${ideaDetails.indexOf(idea)}`}
              className="w-full max-w-sm"
            >
              <Card {...idea} />
            </Link>
          )}
        />
        {filteredIdeas.length === 0 && (
          <div className="text-gray-500 text-center w-full py-12 text-lg">
            Sonuç bulunamadı. Filtreleri değiştirerek tekrar deneyin.
          </div>
        )}
      </div>
    </div>
  );
}
