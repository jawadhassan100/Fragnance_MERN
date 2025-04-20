import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    name: "Ahmed Al Mansoori",
    location: "Dubai, UAE",
    comment:
      "Absolutely stunning fragrance! Long-lasting and perfect for special occasions.",
  },
  {
    name: "Fatima Al Zahra",
    location: "Abu Dhabi, UAE",
    comment:
      "This is my new go-to perfume. It feels luxurious and elegant. Highly recommend!",
  },
  {
    name: "Khalid Al Habtoor",
    location: "Sharjah, UAE",
    comment:
      "The scent is rich and bold, just how I like it. Amazing packaging too!",
  },
  {
    name: "Layla Al Farsi",
    location: "Dubai Marina, UAE",
    comment:
      "One of the finest perfumes I’ve ever tried. The longevity is impressive.",
  },
];

const Reviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold  mb-10">Customer Reviews</h2>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className=" rounded-xl p-8 shadow-lg">
            <FaQuoteLeft className=" text-3xl mb-4 mx-auto" />
            <p className="text-lg italic mb-4">"{review.comment}"</p>
            <h3 className="font-bold text-xl">{review.name}</h3>
            <p className="text-gray-400 text-sm">{review.location}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Reviews;
