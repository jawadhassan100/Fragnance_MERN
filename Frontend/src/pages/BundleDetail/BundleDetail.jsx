import { useState } from 'react';
import ElegantCoco from "../../assets/ElegentCoco.jpg";


const perfumeOptions = ["Scarlet Elegance", "Timeless Essence", "Bold Ambition", "Oud Rose Blossom"];

export default function BundleDetail() {
  const [selectedOptions, setSelectedOptions] = useState(["", "", "", ""]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = value;
    setSelectedOptions(updatedOptions);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center md:flex-row gap-10">
        {/* Left: Image */}
        <div className="md:w-1/2 ">
          <img src={ElegantCoco} alt="Bundle" className="rounded-lg shadow-md" />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">1 Free - Bundle Offer</h2>
          <p className="text-xl text-green-500 mb-2">240.00 AED <span className="line-through text-gray-500 ml-2">320.00 AED</span></p>
          <p className="mb-4">Get 4 Luxury Perfumes for the price of 3. Choose any 4 from the options below.</p>

          {/* Select Options */}
          {selectedOptions.map((value, idx) => (
            <select
              key={idx}
              value={value}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              className="mb-3 p-2 border border-gray-400 rounded w-full"
            >
              <option value="" className=''>Select Option {idx + 1}</option>
              {perfumeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ))}

          {/* Quantity and Add to Cart */}
          <div className="flex items-center mt-4 gap-3">
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p>Just pay for 3 perfumes and get the 4th one for free along with Free Delivery!</p>
      </div>
    </div>
  );
}
