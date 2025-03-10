"use client";

import { Play, Tv } from "lucide-react";
import { useState } from "react";
import { seasons } from "./data/friends-episodes";

function App() {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSeason = seasons[selectedSeason - 1];
  const currentEpisode = currentSeason.episodes[selectedEpisode - 1];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <div
        className="relative h-[80vh] bg-cover bg-center flex items-end p-12"
        style={{
          backgroundImage:
            "url(https://www.abystyle.com/img/c/m/294_S_Friends.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="relative max-w-3xl z-10">
          <h1 className="text-6xl font-extrabold text-white">Friends</h1>
          <p className="text-lg text-gray-300 mt-4">
            Follow the lives of six reckless adults living in Manhattan, as they
            navigate friendships, relationships, and adventures.
          </p>
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-semibold hover:bg-red-500 transition duration-300"
            >
              <Play size={24} /> Play Now
            </button>
          )}
        </div>
      </div>

      {/* Player Section */}
      {isPlaying && (
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <div className="bg-black rounded-lg overflow-hidden shadow-xl w-full max-w-4xl">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://vidsrc.net/embed/tv/tt0108778/${selectedSeason}/${selectedEpisode}`}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Episode Selection */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Tv size={28} className="text-red-500" />
          <select
            onChange={(e) => {
              setSelectedSeason(Number(e.target.value));
              setSelectedEpisode(1);
            }}
            value={selectedSeason}
            className="bg-black border border-red-500 rounded-lg px-4 py-2 text-lg focus:outline-none focus:border-red-600"
          >
            {seasons.map((s, index) => (
              <option
                key={index}
                value={index + 1}
                className="bg-black text-white"
              >
                Season {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentSeason.episodes.map((episode, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedEpisode(episode.number);
                setIsPlaying(true);
              }}
              className={`relative p-4 rounded-lg overflow-hidden transition-all transform hover:scale-105 shadow-lg 
                ${
                  selectedEpisode === episode.number
                    ? "bg-red-600 text-white"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
            >
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                S{selectedSeason}E{episode.number}
              </span>
              <h3 className="text-lg font-medium mt-6">{episode.title}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
