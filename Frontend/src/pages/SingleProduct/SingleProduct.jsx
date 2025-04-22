import { useState } from "react";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/(1).jpg";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

const product = {
  title: "Amber Musk",
  subtitle: "Our Impression of Narciso Rodriguez For Her",
  type: "Extrait De Parfum",
  retailPrice: 500,
  price: 77.5,
  originalPrice: 100.0,
  size: "60ML",
  sku: "990033",
  category: "For Her",
  perfumeFamily: "Floral Fragrances",
  longevity: "8-10 hours",
  sillage: "Moderate",
  description:
    "Amber Musk is a sophisticated Extrait De Parfum designed exclusively for her. A fragrance that embodies elegance, confidence, and femininity.",
  notes: {
    top: "Orange Blossom, Orange Flower",
    middle: "Amber, Vanilla, Musk",
    base: "Vetiver, Woody Notes",
  },
  images: [img1, img2, img1, img2],
};

const SingleProduct = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="px-4 sm:px-8 lg:px-16 xl:px-32 pt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
    {/* Left: Product Images */}
    <div>
      <div className="w-full mb-4">
        <InnerImageZoom
          src={selectedImage}
          zoomSrc={selectedImage}
          zoomType="hover"
          zoomPreload={true}
          alt="Product"
          className="w-full max-w-md mx-auto"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {product.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 object-cover border-2 rounded cursor-pointer transition ${
              selectedImage === img
                ? "border-black"
                : "border-gray-300 hover:border-gray-500"
            }`}
          />
        ))}
      </div>
    </div>

    {/* Right: Product Info */}
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{product.title}</h2>
      <p className="text-sm text-gray-500 italic">{product.subtitle}</p>
      <p className="text-sm text-gray-500">{product.type}</p>
      <p className="text-sm text-gray-400">
        <span className="font-semibold">Retail Price:</span> AED{" "}
        {product.retailPrice}
      </p>

      <div className="flex items-center gap-3">
        <p className="text-xl text-green-600 font-bold">
          AED {product.price.toFixed(2)}
        </p>
        <p className="line-through text-gray-400 text-sm">
          AED {product.originalPrice.toFixed(2)}
        </p>
      </div>

      <ul className="text-sm text-gray-700 space-y-1">
        <li>
          <strong>Size:</strong> {product.size}
        </li>
        <li>
          <strong>SKU:</strong> {product.sku}
        </li>
        <li>
          <strong>Category:</strong> {product.category}
        </li>
        <li>
          <strong>Perfume Family:</strong> {product.perfumeFamily}
        </li>
        <li>
          <strong>Longevity:</strong> {product.longevity}
        </li>
        <li>
          <strong>Sillage:</strong> {product.sillage}
        </li>
      </ul>

      <button className="w-full sm:w-fit bg-black text-white py-2 px-6 hover:bg-gray-800 transition">
        Add to Cart
      </button>
    </div>

    {/* Bottom: Tabs Section */}
    <div className="lg:col-span-2 mt-10">
      <div className="flex flex-wrap gap-4 border-b mb-4">
        {["description", "additional", "reviews"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium text-sm capitalize ${
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace(/^\w/, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {activeTab === "description" && (
        <div className="text-gray-700 text-sm leading-relaxed">
          <strong>Top Notes:</strong> {product.notes.top} <br />
          <strong>Middle Notes:</strong> {product.notes.middle} <br />
          <strong>Base Notes:</strong> {product.notes.base}
        </div>
      )}

      {activeTab === "additional" && (
        <p className="text-gray-700 text-sm">
          Long-lasting | Elegant design | Perfect for gifting
        </p>
      )}

      {activeTab === "reviews" && (
        <p className="text-gray-700 text-sm">No reviews yet.</p>
      )}
    </div>
  </div>
  );
};

export default SingleProduct;
