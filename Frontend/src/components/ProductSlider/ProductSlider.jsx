import { useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/(1).jpg";

const products = [
  {
    id: 1,
    name: "Velvet Blossom",
    description: "Inspired by Tom Ford Black Orchid unisex",
    price: "77.50 AED",
    image: img1,
  },
  {
    id: 2,
    name: "Silken Oud",
    description: "Inspired by MFK Oud Satin Mood men",
    price: "84.50 AED",
    image: img2,
  },
  {
    id: 3,
    name: "Amber Petal",
    description: "Inspired by Lancôme Oud Bouquet women",
    price: "79.50 AED",
    image: img1,
  },
  {
    id: 4,
    name: "Cedar Horizon",
    description: "Inspired by Mancera Cedrat Boise unisex",
    price: "74.50 AED",
    image: img2,
  },
];

const ProductSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl pt-12 mx-auto p-2">
    <Slider ref={sliderRef} {...settings}>
      {products.map((product) => (
        <div key={product.id} className="p-1">
          <div className="bg-white shadow-md overflow-hidden group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover"
            />
            <div className="p-2 text-left">
              <h3 className="text-xs font-medium">{product.name}</h3>
              <p className="text-gray-600 text-[10px]">{product.description}</p>
              <p className="text-green-600 text-xs">{product.price}</p>
              <button className="text-gray-600 py-1 text-xs  cursor-pointer w-full translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
  
  );
};

export default ProductSlider;
