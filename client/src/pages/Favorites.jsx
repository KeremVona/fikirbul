import React, { useEffect, useState } from "react";
import { ideaDetails } from "../data/ideaDetails";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Favorites() {
  const [savedIdeas, setSavedIdeas] = useState([]);

  useEffect(() => {
    const savedTitles = JSON.parse(localStorage.getItem("savedIdeas") || "[]");
    setSavedIdeas(
      ideaDetails.filter((idea) => savedTitles.includes(idea.title))
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-0 md:p-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Favorilerim</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {savedIdeas.length === 0 ? (
              <div className="text-gray-500 text-center w-full py-12">
                Henüz favori eklemediniz.
              </div>
            ) : (
              savedIdeas.map((idea, i) => <Card key={i} {...idea} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
}
