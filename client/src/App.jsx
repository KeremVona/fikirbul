import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import IdeaDetail from "./pages/IdeaDetail";
import Favorites from "./pages/Favorites";
import ContactPage from "./pages/ContactPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idea/:id" element={<IdeaDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
