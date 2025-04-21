import { useNavigate } from "react-router-dom";

const AboutPreview = () => {
  const navigate = useNavigate();

  return (
    <div className=" py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center  mb-6">About Us</h2>
      <div className="max-w-4xl mx-auto text-center text-gray-600 text-md leading-relaxed mb-6">
        <p className="mb-4">
          LaScentio Fragrances is a passion-driven brand founded by two childhood friends with a shared dream of making luxury accessible to everyone.
        </p>
        <p className="mb-4">
                With a commitment to excellence and a belief that everyone deserves to experience the elegance of premium fragrances, La&apos;Scentio Fragrances combines artistry and affordability to craft scents that evoke timeless memories and moments of joy.
              </p>
        <p className="mb-4">
          Our journey reflects the strength of friendship, a love for innovation, and a dedication to bringing sophistication and charm into the lives of our customers.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/about-us")}
          className="bg-black border text-white hover:border hover:text-black hover:bg-white font-semibold px-6 py-2  transition-all"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default AboutPreview;
