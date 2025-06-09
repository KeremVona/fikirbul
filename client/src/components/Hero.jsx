import React, { useRef } from "react";
import IdeaList from "./IdeaList";
import img1 from "../../public/undraw_launch-event_aur1.svg";

export default function Hero() {
  const ideaListRef = useRef(null);

  const handleScrollToIdeas = () => {
    if (ideaListRef.current) {
      ideaListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="bg-white text-gray-900 body-font py-24">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-5">
          <div className="flex flex-col md:items-start md:text-left items-center text-center md:w-1/2 w-full">
            <h1 className="font-extrabold text-4xl sm:text-5xl mb-4 leading-tight text-indigo-700">
              Fikirleri Keşfet, Projeni Yapmaya Başla
            </h1>
            <p className="mb-8 text-lg text-gray-600 max-w-xl">
              Yapay zeka ve SaaS dünyasında öne çıkacak girişim fikirlerini ilk
              keşfedenlerden olun. Favorilerinizi kaydedin ve kendi
              yolculuğunuza başlayın.
            </p>
            <div className="flex gap-4">
              <button
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition-all duration-200 text-lg"
                onClick={handleScrollToIdeas}
              >
                Fikirleri Keşfet
              </button>
              <button
                className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold shadow-md transition-all duration-200 text-lg"
                onClick={() => (window.location.href = "/contact")}
              >
                Fikrim Var
              </button>
            </div>
          </div>
          <div className="md:w-1/2 w-full mb-10 md:mb-0 flex justify-center">
            <img
              className="w-96 max-w-full h-auto animate-fade-in"
              alt="Startup Illustration"
              src={img1}
            />
          </div>
        </div>
      </section>
      <div ref={ideaListRef} />
    </>
  );
}
