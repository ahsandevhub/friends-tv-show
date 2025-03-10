"use client";

import { Play, Tv, X } from "lucide-react";
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
        className="relative h-[70vh] bg-cover bg-center flex flex-col justify-end pb-16 px-8"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(https://www.abystyle.com/img/c/m/294_S_Friends.jpg)",
        }}
      >
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold mb-4">Friends</h1>
          <p className="text-lg text-gray-300 mb-6">
            Follow the lives of six reckless adults living in Manhattan, as they
            indulge in adventures which make their lives both troublesome and
            happening.
          </p>
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="bg-red-600 text-white px-8 py-3 rounded-md flex items-center gap-2 hover:bg-red-500 transition-transform transform hover:scale-105"
            >
              <Play size={24} className="animate-pulse" />
              Play Now
            </button>
          )}
        </div>
      </div>

      {/* Player Section */}
      {isPlaying && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-80 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="relative w-full max-w-screen-xl aspect-video rounded-2xl shadow-2xl shadow-red-500/30 border-2 border-red-500/50">
            <iframe
              className="w-full h-full rounded-2xl"
              src={`https://vidsrc.net/embed/tv/tt0108778/${selectedSeason}/${selectedEpisode}`}
              allowFullScreen
            />
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 bg-red-600 rounded-full p-2 hover:bg-red-500 transition-transform transform hover:scale-110"
            >
              <X size={24} className="text-white" />
            </button>
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
            className="bg-gray-800 border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
          >
            {seasons.map((s, index) => (
              <option key={index} value={index + 1} className="bg-gray-800">
                Season {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentSeason.episodes.map((episode, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedEpisode(episode.number);
                setIsPlaying(true);
              }}
              className={`
                p-3 rounded-md transition-all transform hover:scale-105 hover:shadow-md
                ${
                  selectedEpisode === episode.number
                    ? "bg-red-600 text-white shadow-red-500/50"
                    : "bg-gray-800 border border-gray-700 hover:bg-gray-700"
                }
              `}
            >
              <div className="flex flex-col items-start">
                <div className="aspect-video w-full mb-2 overflow-hidden rounded-md">
                  <img
                    src={`https://img.youtube.com/vi/placeholder/mqdefault.jpg`}
                    alt={episode.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-sm md:text-base">
                  {episode.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Season {selectedSeason} Episode {episode.number}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center border-t border-gray-700">
        <p className="text-gray-400">
          Developed by{" "}
          <a
            href="https://ahsandevhub.com"
            className="text-red-500 hover:underline"
          >
            AhsanDevhub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
