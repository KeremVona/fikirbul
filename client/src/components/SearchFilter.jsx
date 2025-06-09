import React, { useState } from "react";

const revenueOptions = [
  { label: "Tümü", value: "all" },
  { label: "0 – 10K ₺", value: "0-10000" },
  { label: "10K – 50K ₺", value: "10000-50000" },
  { label: "50K – 100K ₺", value: "50000-100000" },
  { label: "100K+ ₺", value: "100000+" },
];

const buildTimeOptions = [
  { label: "Tümü", value: "all" },
  { label: "1 gün", value: "1g" },
  { label: "1 hafta", value: "1h" },
  { label: "2 hafta", value: "2h" },
  { label: "1 ay", value: "1a" },
  { label: "2 ay", value: "2a" },
  { label: "3 ay", value: "3a" },
];

const userCountOptions = [
  { label: "Tümü", value: "all" },
  { label: "0–100", value: "0-100" },
  { label: "100–1K", value: "100-1000" },
  { label: "1K–10K", value: "1000-10000" },
  { label: "10K+", value: "10000+" },
];

export default function SearchFilter({
  search,
  setSearch,
  revenue,
  setRevenue,
  buildTime,
  setBuildTime,
  userCount,
  setUserCount,
}) {
  return (
    <section className="w-full flex flex-col md:flex-row md:items-end gap-4 md:gap-6 p-4 md:p-6 bg-white rounded-xl shadow mb-8">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ara
        </label>
        <input
          type="text"
          placeholder="Başlık veya açıklama ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gelir
        </label>
        <select
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          {revenueOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Yapım Süresi
        </label>
        <select
          value={buildTime}
          onChange={(e) => setBuildTime(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          {buildTimeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kullanıcı
        </label>
        <select
          value={userCount}
          onChange={(e) => setUserCount(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          {userCountOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
