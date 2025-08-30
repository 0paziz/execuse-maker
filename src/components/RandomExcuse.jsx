import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Card, CardContent } from "./Card";
import { Copy, RefreshCw, Heart } from "lucide-react";

export default function ExcuseMaker() {
  const [excuse, setExcuse] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState("");

  const categories = [
    "family",
    "office",
    "children",
    "college",
    "party",
    "funny",
    "unbelievable",
    "developers",
    "gaming",
  ];

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const getExcuse = async () => {
    setLoading(true);
    try {
      const url = category
        ? `https://excuser-three.vercel.app/v1/excuse/${category}`
        : "https://excuser-three.vercel.app/v1/excuse";

      const res = await fetch(url);
      const data = await res.json();
      setExcuse(data[0]?.excuse || "No excuse found 🙃");
    } catch (err) {
      setExcuse("⚠️ Error fetching excuse");
    } finally {
      setLoading(false);
    }
  };

  const copyExcuse = () => {
    if (excuse) {
      navigator.clipboard.writeText(excuse);
      alert("📋 Excuse copied to clipboard!");
    }
  };

  const saveFavorite = () => {
    if (excuse && !favorites.includes(excuse)) {
      setFavorites([...favorites, excuse]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg text-center">
        Excuse Maker 🤷‍♂️
      </h1>
      <p className="mb-6 text-lg md:text-xl text-center opacity-90">
        Need a quick excuse? Get one instantly!
      </p>

      {/* Category Dropdown */}
      <div className="w-full max-w-xs mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-xl text-gray-800 shadow-md focus:ring-4 focus:ring-purple-300 outline-none"
        >
          <option value="">-- Any Category --</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Generate Button */}
      <Button
        onClick={getExcuse}
        disabled={loading}
        className="mb-6 text-lg px-8 py-3 rounded-2xl shadow-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition"
      >
        {loading ? "Thinking…" : "Generate Excuse"}
      </Button>

      {/* Excuse Display Card */}
      {excuse && (
        <Card className="bg-white/90 backdrop-blur-md text-gray-900 max-w-2xl w-full rounded-2xl shadow-2xl border border-gray-200 mb-6 transition transform hover:scale-[1.01]">
          <CardContent>
            <p className="text-xl md:text-2xl font-medium mb-6 leading-relaxed text-center">
              “{excuse}”
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={copyExcuse}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl"
              >
                <Copy className="h-4 w-4" /> Copy
              </Button>
              <Button
                onClick={getExcuse}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl"
              >
                <RefreshCw className="h-4 w-4" /> Another
              </Button>
              <Button
                onClick={saveFavorite}
                className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl"
              >
                <Heart className="h-4 w-4" /> Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="bg-white/95 backdrop-blur-md text-gray-900 max-w-2xl w-full rounded-2xl shadow-xl p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4 text-center">⭐ Favorites</h2>
          <ul className="space-y-3 text-gray-800 text-center">
            {favorites.map((fav, idx) => (
              <li
                key={idx}
                className="p-3 rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition"
              >
                {fav}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-sm opacity-80 text-center">
        Made for fun 🚀 by{" "}
        <a
          href="https://github.com/0paziz"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-200"
        >
          Abdiaziz
        </a>
      </footer>
    </div>
  );
}
