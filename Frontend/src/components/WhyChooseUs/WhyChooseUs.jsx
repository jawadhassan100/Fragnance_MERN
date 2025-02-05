
const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Craftsmanship Meets Affordability",
      description: "We blend artistry and affordability to deliver fragrances that reflect the essence of luxury."
    },
    {
      title: "Inspired by Iconic Brands",
      description: "Our perfume impressions are meticulously designed to mirror the world's most celebrated fragrances, offering you the similar sophistication at a fraction of the cost."
    },
    {
      title: "Timeless Elegance",
      description: "Every scent is crafted to enhance your personal style and leave a lasting impression."
    },
    {
      title: "Ethically Conscious",
      description: "We prioritize sustainable sourcing and eco-friendly practices, ensuring our products are both luxurious and responsible."
    },
    {
      title: "Made for You",
      description: "With a diverse range of fragrances, we have something to suit every taste, mood, and occasion."
    },
    {
      title: "Trusted Quality",
      description: "We rigorously test our products to ensure you receive only the finest fragrance impressions."
    },
    {
      title: "A Story of Friendship and Passion",
      description: "Built on a foundation of trust and love for fine fragrances, our brand reflects the heartfelt dedication of its founders."
    },
    {
      title: "Unmatched Value",
      description: "We offer you premium quality scents without compromising on affordability or excellence."
    },
    {
      title: "Experience Luxury Daily",
      description: "With LaScentio, you don't need a special occasion to feel extraordinary. Our fragrances bring luxury into your everyday life."
    }
  ];

  return (
    <div className="bg-emerald-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-800 mb-6">Why Choose Us</h2>
          <p className="text-emerald-600 text-lg max-w-2xl mx-auto">
            At LaScentio Fragrances, we believe in offering more than just scents, we provide an experience of luxury and elegance at an affordable price. Here&apos;s why we stand out:
          </p>
        </div>

        {/* Grid of reasons */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-white p-6  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600"
            >
              <div className="flex items-start mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-[#FDFBD4] rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <h3 className="text-emerald-800 font-bold text-xl ml-4">
                  {reason.title}
                </h3>
              </div>
              <p className="text-emerald-700 ml-12">
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