import { useState } from "react";

const perfumeData = {
  "Narciso Rodriguez": [
    { name: "Amber Musk", price: 77.5, size: "60ML" },
    { name: "Pure Jasmine", price: 82.0, size: "50ML" },
  ],
  "Chanel": [
    { name: "Coco Mademoiselle", price: 120.0, size: "100ML" },
    { name: "No. 5", price: 150.0, size: "75ML" },
  ],
  "Dior": [
    { name: "J'adore", price: 110.0, size: "100ML" },
    { name: "Miss Dior", price: 95.0, size: "80ML" },
  ],
};

const CreateYourOwn = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedPerfume(null); // reset when brand changes
  };

  const handlePerfumeChange = (e) => {
    const perfumeName = e.target.value;
    const perfume = perfumeData[selectedBrand].find((p) => p.name === perfumeName);
    setSelectedPerfume(perfume);
  };

  return (
    <div className=" mx-auto w-[40%] mt-10 bg-white shadow-xl container p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Your Own</h2>

      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Select Brand</label>
        <select
          className="w-full border border-gray-300  p-2 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={handleBrandChange}
          value={selectedBrand}
        >
          <option value="">-- Choose a Brand --</option>
          {Object.keys(perfumeData).map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {selectedBrand && (
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Select Perfume</label>
          <select
            className="w-full border border-gray-300  p-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handlePerfumeChange}
            value={selectedPerfume?.name || ""}
          >
            <option value="">-- Choose a Perfume --</option>
            {perfumeData[selectedBrand].map((perfume) => (
              <option key={perfume.name} value={perfume.name}>
                {perfume.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedPerfume && (
        <div className="bg-gray-50 p-4 border border-gray-200 mb-4">
          <p className="text-gray-800 text-lg font-semibold">{selectedPerfume.name}</p>
          <p className="text-gray-600 text-sm">Size: {selectedPerfume.size}</p>
          <p className="text-green-600 font-bold mt-1">AED {selectedPerfume.price.toFixed(2)}</p>
        </div>
      )}

      {selectedPerfume && (
        <button className="w-full bg-black text-white py-2  hover:bg-gray-800 transition">
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default CreateYourOwn;
