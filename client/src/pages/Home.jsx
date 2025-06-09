import React from "react";
import Hero from "../components/Hero";
import IdeaList from "../components/IdeaList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <IdeaList />
      <Footer />
    </>
  );
}
