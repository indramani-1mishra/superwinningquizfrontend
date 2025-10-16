import React from "react";

const leaderboardData = [
  { rank: 1, name: "268XXXXXXX", id: "00285130971", scores: "960,883", matches: "7,920", winrate: "92.04%" },
  { rank: 2, name: "268XXXXXXX", id: "88019463581", scores: "902,037", matches: "8,918", winrate: "87.30%" },
  { rank: 3, name: "268XXXXXXX", id: "67255137771", scores: "871,006", matches: "7,840", winrate: "81.27%" },
  { rank: 4, name: "268XXXXXXX", id: "00116130348", scores: "620,553", matches: "2,003", winrate: "79.03%" },
  { rank: 5, name: "268XXXXXXX", id: "45185276601", scores: "520,972", matches: "6,130", winrate: "71.88%" },
  { rank: 6, name: "268XXXXXXX", id: "45185276601", scores: "520,972", matches: "6,130", winrate: "71.88%" },
  { rank: 7, name: "268XXXXXXX", id: "45185276601", scores: "520,972", matches: "6,130", winrate: "71.88%" },
  { rank: 8, name: "268XXXXXXX", id: "45185276601", scores: "520,972", matches: "6,130", winrate: "71.88%" },
  { rank: 9, name: "268XXXXXXX", id: "45185276601", scores: "520,972", matches: "6,130", winrate: "71.88%" },
  { rank: 10, name: "268XXXXXXX", id: "45185276601", scores: "520,972", matches: "6,130", winrate: "71.88%" },
];

export default function LeaderboardTable() {
  return (
    <div
      className="min-h-screen text-white flex flex-col items-center py-10 px-4 md:px-10 bg-cover bg-center relative"
      style={{ backgroundImage: `url('/leaderboard-bg.png')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        <h1 className="mt-5 text-2xl md:text-4xl font-bold text-yellow-400 text-center">
          🏆 LEADERBOARD 🏆
        </h1>

        {/* Desktop Table */}
        <div className="hidden sm:block w-full overflow-x-auto mt-8">
          <div className="min-w-[800px] bg-purple-900/70 rounded-2xl border-4 border-yellow-500 shadow-[0_0_35px_rgba(255,215,0,0.7)]">
            <div className="grid grid-cols-6 text-sm md:text-base font-bold bg-purple-700/80 py-4 px-2 md:px-6 text-yellow-300 border-b border-yellow-500">
              <span className="pl-4">RANK</span>
              <span>Mobile No</span>
              <span>ID</span>
              <span>SCORES</span>
              <span>MATCHES</span>
              <span>WINRATE</span>
            </div>

            {leaderboardData.map((player) => (
              <div
                key={player.rank}
                className={`grid grid-cols-6 items-center py-4 px-2 md:px-6 border-b border-purple-700 transition-all
                ${player.rank <= 3 ? "bg-yellow-500/20 shadow-[0_0_15px_rgba(255,255,0,0.5)]" : ""}
                hover:bg-purple-700/50 hover:scale-[1.01]`}
              >
                <div className="font-bold text-yellow-400 pl-4 text-lg">#{player.rank}</div>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-gray-900
                    ${
                      player.rank === 1
                        ? "bg-yellow-400"
                        : player.rank === 2
                        ? "bg-gray-300"
                        : player.rank === 3
                        ? "bg-orange-400"
                        : "bg-white"
                    }`}
                  >
                    {player.name[0]}
                  </div>
                  <span>{player.name}</span>
                </div>
                <span>{player.id}</span>
                <span>{player.scores}</span>
                <span>{player.matches}</span>
                <span>{player.winrate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 📱 Mobile View */}
        <div className="sm:hidden w-full mt-8 flex flex-col gap-4">
          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className={`bg-purple-900/60 rounded-xl border-2 border-yellow-500 p-4 shadow-lg text-sm transition-all 
              ${player.rank <= 3 ? "bg-yellow-500/20" : ""} hover:scale-[1.02]`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-yellow-400 text-lg">#{player.rank}</span>
                <span className="text-gray-300">{player.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-gray-200">
                <span>ID: {player.id}</span>
                <span>Scores: {player.scores}</span>
                <span>Matches: {player.matches}</span>
                <span>Winrate: {player.winrate}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-24"></div>
      </div>
    </div>
  );
}
