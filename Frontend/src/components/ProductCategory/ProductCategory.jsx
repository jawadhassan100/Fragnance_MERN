import img1 from "../../assets/1.jpg";

const categories = [
  { id: 1, label: "For Men", overlay: true },
  { id: 2, label: "For Women", overlay: true },
  { id: 3, label: "For Both", overlay: true },
];

const ProductCategory = () => {
  return (
    <div className="">

    <div className="max-w-7xl mx-auto px-4 pt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="relative group overflow-hidden  shadow-lg cursor-pointer"
        >
          {/* Image */}
          <div
            className={`w-full h-96 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 ${
              category.overlay ? "brightness-50 group-hover:brightness-100" : ""
            }`}
            style={{ backgroundImage: `url(${img1})` }}
          ></div>

          {/* Text Overlay */}
          <div className="absolute top-5 left-5 text-white text-lg font-semibold">
            {category.label}
          </div>

          {/* Button */}
          <div className="absolute top-12 left-17 cursor-pointer transform -translate-x-1/2">
            <button className="px-4 py-2  text-white  rounded-lg text-sm transition-all duration-300">
              View Products
            </button>
            <span className="absolute left-9 top-8 -bottom-1 w-1/4 h-0.5 bg-[#FDFBD4] transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProductCategory;
