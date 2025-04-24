import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { LuMenu } from "react-icons/lu";
import { TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = 0; 

  return (
    <nav className="bg-black text-[#FFD700]  shadow-lg py-6  w-full z-50">
      <div className="container mx-auto px-4 relative flex items-center py-3">
        {/* Left: Menu Items */}
        <div className="hidden  lg:flex space-x-4 text-[14px] flex-1">
          <Link
            to="/"
            className=" uppercase font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-500  after:left-0 after:-bottom-1"
          >
            Homes
          </Link>
          <Link
            to="/perfumes"
            className=" uppercase font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-500  after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
            Perfumes
          </Link>
          <Link
            to="/create"
            className=" uppercase font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-500  after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
            Create
          </Link>
          <Link
            to="/bundle"
            className=" uppercase font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-500  after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
            Bundle
          </Link>
          <Link
            to="/about-us"
            className=" uppercase font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-500  after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
           About Us
          </Link>
          <Link
            to="/contact-us"
            className=" uppercase font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-500  after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
           Contact Us
          </Link>
        </div>

        {/* Mobile: Left hamburger menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden cursor-pointer  text-2xl"
        >
          <LuMenu />
        </button>

        {/* Center: Logo (absolute positioning for true center) */}
        <div className="absolute left-[50%] transform -translate-x-1/2 text-xl font-bold">
          <Link to="/" className="">
          LaScentio
          </Link>
        </div>

        {/* Right: Cart (with margin-left-auto to push to right) */}
        <div className="relative ml-auto">
          <Link to="/cart">
            <div className="flex justify-center items-center">
              <TiShoppingCart className="text-3xl" />
              <span className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartCount}
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-full bg-black  text-yellow-500 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute cursor-pointer top-6 right-6 text-[#FDFBD4] text-2xl"
        >
          <TfiClose />
        </button>
        <ul className="flex flex-col gap-14 mt-24 items-center text-lg font-semibold">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className=" uppercase font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-500 after:left-0 after:-bottom-1"
          >
            Homes
          </Link>
          <Link
            to="/perfumes"
            onClick={() => setIsOpen(false)}
            className=" uppercase font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-500 after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
            Perfumes
          </Link>
          <Link
            to="/create"
            onClick={() => setIsOpen(false)}
            className=" uppercase font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-500 after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
            Create
          </Link>
          <Link
            to="/about-us"
            onClick={() => setIsOpen(false)}
            className=" uppercase font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-500 after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            onClick={() => setIsOpen(false)}
            className=" uppercase font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-500 after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
            Contact Us
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;