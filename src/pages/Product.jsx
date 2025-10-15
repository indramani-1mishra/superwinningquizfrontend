import React from "react";
import e1 from "../product/e1.png";
import e2 from "../product/e2.png";
import e3 from "../product/e3.png";
import e4 from "../product/e4.png";
import e5 from "../product/e5.png";
import e6 from "../product/e6.png";
import e7 from "../product/e7.png";
import e8 from "../product/e8.jpeg";
import e9 from "../product/e9.jpeg";
import ninja from "../product/ninja.jpeg";

export default function Product() {
  const upcomingGames = [
    { title: "Cube Ninja", img: ninja },
    { title: "Traffic Racer", img: e2 },
    { title: "Watercraft Rush", img: e8 },
    { title: "WWII Air Battle", img: e9 },
  ];

  const moreGames = [
    { title: "Galaxy Defender", img: e1 },
    { title: "Speed Rider", img: e3 },
    { title: "Zombie Attack", img: e4 },
    { title: "Space Shooter", img: e5 },
  
  ];

  return (
    <div
      className="relative min-h-screen text-white flex flex-col items-center py-10 px-4 md:px-10 lg:px-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/leaderboard-bg.png')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg mt-5">
            Super Winnings Games
          </h1>
          <p className="mt-3 text-gray-300 text-lg md:text-xl">
            Explore the hottest upcoming games and boost your winning streak!
          </p>
        </div>

        {/* Coming Soon Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {upcomingGames.map((game, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer transform hover:scale-105 transition duration-300 group"
              >
                <img
                  src={game.img}
                  alt={game.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-md">
                  {game.title}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* More Games Section */}
        <section>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
            {moreGames.map((game, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer transform hover:scale-105 transition duration-300 group"
              >
                <img
                  src={game.img}
                  alt={game.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-md">
                  {game.title}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
