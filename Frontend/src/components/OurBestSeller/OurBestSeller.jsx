import image from "../../assets/1.jpg";

const OurBestSeller = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 ">
        Our Best Sellers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="relative overflow-hidden  group shadow-lg"
          >
            {/* Image */}
            <img
              src={image}
              alt={`Best Seller ${item}`}
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Slide-up content */}
            <div className="absolute bottom-0 left-0 w-full bg-black/80 text-white text-center p-4 transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
              <h3 className="text-lg font-semibold">Product Name</h3>
              <p className="text-sm text-gray-300">$99.99</p>
              <p className="text-xs mt-1 text-gray-400">Long-lasting • 100ml</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurBestSeller;
