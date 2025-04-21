import { useState } from "react";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const perfumeImpressions = [
  { name: "Gilded Girl", impressionOf: "Good Girl", startsWith: "G" },
  { name: "Elegant Coco", impressionOf: "Coco Chanel", startsWith: "C" },
  { name: "Pure Grace", impressionOf: "Amazing Grace", startsWith: "P" },
  { name: "Wild Elegance", impressionOf: "YSL’s Libre", startsWith: "Y" },
  { name: "Velvet Temptation", impressionOf: "Velvet Orchid", startsWith: "V" },
  { name: "Aventis Noir", impressionOf: "Creed Aventus", startsWith: "A" },
  { name: "Bleu Horizon", impressionOf: "Bleu de Chanel", startsWith: "B" },
  { name: "Savage Essence", impressionOf: "Dior Sauvage", startsWith: "S" },
  { name: "Bold Desire", impressionOf: "Dior Homme", startsWith: "B" },
  { name: "Timeless Gentleman", impressionOf: "Tom Ford Noir", startsWith: "T" },
  { name: "Velvet Orchids", impressionOf: "Tom Ford Velvet Orchid", startsWith: "V" }

];

const PerfumeImpressions = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const filteredPerfumes = perfumeImpressions.filter(
    (p) => p.startsWith === selectedLetter
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Explore Perfume Impressions
      </h2>

      {/* Alphabet Grid */}
      <div className="grid grid-cols-13 sm:grid-cols-13 gap-2 justify-center text-center mb-6">
        {alphabets.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`px-1 py-1  text-sm font-medium border border-gray-500 ${
              selectedLetter === letter
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Display Filtered Perfumes */}
      <div className="grid text-center  sm:grid-cols-2 gap-4 mt-4">
        {filteredPerfumes.length > 0 ? (
          
          filteredPerfumes.map((perfume, i) => (

            <div
              key={i}
              className="border  p-4 bg-white shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {perfume.name}
              </h3>
              <p className="text-sm text-gray-500">
                Impression of: <b>{perfume.impressionOf}</b>
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500">
            No perfumes starting with <b>{selectedLetter}</b> yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default PerfumeImpressions;
