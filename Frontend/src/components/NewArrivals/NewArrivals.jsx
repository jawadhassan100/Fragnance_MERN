import image from "../../assets/(1).jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NewArrivals = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 slides
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const items = [1, 2, 3, 4]; // Only 4 items

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        New Arrivals
      </h2>

      <Slider {...settings}>
        {items.map((item) => (
          <div key={item} className="px-2">
            <div className="relative overflow-hidden group shadow-lg">
              {/* Image */}
              <img
                src={image}
                alt={`New Arrival ${item}`}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Slide-up content */}
              <div className="absolute bottom-0 left-0 w-full bg-black/80 text-white text-center p-4 transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-lg font-semibold">New Arrival</h3>
                <p className="text-sm text-gray-300">$99.99</p>
                <p className="text-xs mt-1 text-gray-400">Long-lasting • 100ml</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;