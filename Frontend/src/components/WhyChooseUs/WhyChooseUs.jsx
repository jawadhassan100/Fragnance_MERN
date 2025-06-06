

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Craftsmanship Meets Affordability",
      description: "We blend artistry and affordability to deliver fragrances that reflect the essence of luxury."
    },
    {
      title: "Inspired by Iconic Brands",
      description: "Our perfume impressions mirror celebrated fragrances at a fraction of the cost."
    },
    {
      title: "Timeless Elegance",
      description: "Every scent is crafted to enhance your personal style and leave a lasting impression."
    },
    {
      title: "Ethically Conscious",
      description: "We prioritize sustainable sourcing and eco-friendly practices."
    },
    {
      title: "Made for You",
      description: "With a diverse range of fragrances for every taste, mood, and occasion."
    },
    {
      title: "Trusted Quality",
      description: "We rigorously test our products to ensure the finest fragrance impressions."
    },
    {
      title: "A Story of Friendship",
      description: "Built on trust and passion for fine fragrances."
    },
    {
      title: "Unmatched Value",
      description: "Premium quality scents without compromising on affordability."
    },
    {
      title: "Experience Luxury Daily",
      description: "Feel extraordinary every day with our luxury fragrances."
    }
  ];

  return (
    <div className=" py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-600 mb-3">Why Choose Us</h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            At LaScentio Fragrances, we offer luxury and elegance at an affordable price.
          </p>
        </div>

        {/* Grid of reasons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded shadow"
            >
              <div className="flex items-start mb-2">
                
                <h3 className="text-gray-800 font-semibold text-sm ">
                  {reason.title}
                </h3>
              </div>
              <p className="text-gray-700 text-xs ">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;