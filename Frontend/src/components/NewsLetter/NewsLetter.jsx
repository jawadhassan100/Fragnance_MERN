const Newsletter = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className=" rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Section */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 ">Newsletter</h2>
            <p className="text-gray-400">Subscribe to get updates on exclusive offers, new arrivals, and more.</p>
          </div>
  
          {/* Right Section */}
          <div className="flex-1  px-20">
            <form className="flex flex-col border-b-2 sm:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-black focus:outline-none"
              />
              <button
                type="submit"
                className=" font-semibold px-6 py-3 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Newsletter;
  