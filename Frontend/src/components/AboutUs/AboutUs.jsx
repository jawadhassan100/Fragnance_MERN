

const AboutUs = () => {
  return (
    <div className=" bg-emerald-50 min-h-screen pt-16">
      {/* Hero Section */}
      <div className=" text-emerald-600 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center ">About Us</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 ">
        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-emerald-600">
            <div className="prose prose-lg">
              <p className="text-emerald-800 text-lg leading-relaxed mb-6">
                LaScentio Fragrances is a passion-driven brand founded by two childhood friends with a shared dream of making luxury accessible to everyone. Rooted in a deep appreciation for fine fragrances, the brand was born out of a desire to create high-quality perfume impressions inspired by the world&apos;s most iconic scents.
              </p>
              <p className="text-emerald-800 text-lg leading-relaxed mb-6">
                With a commitment to excellence and a belief that everyone deserves to experience the elegance of premium fragrances, La&apos;Scentio Fragrances combines artistry and affordability to craft scents that evoke timeless memories and moments of joy.
              </p>
              <p className="text-emerald-800 text-lg leading-relaxed">
                Our journey reflects the strength of friendship, a love for innovation, and a dedication to bringing sophistication and charm into the lives of our customers. At LaScentio Fragrances, we&apos;re not just creating scents—we&apos;re creating lasting impressions.
              </p>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Mission Card */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FDFBD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-emerald-800 text-2xl font-bold ml-4">Mission</h2>
            </div>
            <p className="text-emerald-700 leading-relaxed">
              To make luxury fragrances accessible to all by offering high-quality, affordable perfume impressions inspired by the world&apos;s most iconic scents.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FDFBD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-emerald-800 text-2xl font-bold ml-4">Vision</h2>
            </div>
            <p className="text-emerald-700 leading-relaxed">
              To establish ourselves as a market leader in offering high-quality perfume impressions, making luxury fragrances accessible to all.
            </p>
          </div>

          {/* Values Card */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FDFBD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-emerald-800 text-2xl font-bold ml-4">Values</h2>
            </div>
            <ul className="text-emerald-700 space-y-2">
              {['Quality Excellence', 'Affordability', 'Customer Centricity', 'Integrity', 'Sustainability', 'Innovation'].map((value, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></div>
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;