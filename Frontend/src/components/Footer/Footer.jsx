import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-[#FFD700] text-cream py-10 y">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Left Section: Logo & Contact */}
        <div>
          <h2 className="text-2xl font-bold">LaScentio</h2>
          <div className="flex flex-col gap-2">
          <a href="mailto:support@lascentiofragrances.ae" className="mt-2 cursor-pointer text-sm">support@lascentiofragrances.com</a>
          <a href="tel:03425645900" className="mt-1 cursor-pointer  text-sm"> +1 234 567 890</a>
          </div>
        </div>

        {/* Center Section: Navigation Menu */}
        <div className="flex flex-col cursor-pointer space-y-2">
          <Link to="/" className="">Homes</Link>
          <Link to="/perfumes" className="">Perfumes</Link>
          <Link to="/impressions" className="">Impressions</Link>
          <Link to="/about-us" className="">About Us</Link>
          <Link to="/contact-us" className="">Contact Us</Link>
        </div>

        {/* Right Section: Policies */}
        <div className="flex flex-col cursor-pointer space-y-2">
          <Link to="/faq" className="">FAQ</Link>
          <Link to="/terms" className="">Terms & Conditions</Link>
          <Link to="/privacy" className="">Privacy Policy</Link>
          <Link to="/return-policy" className="">Return & Exchange Policy</Link>
        </div>
      </div>

      {/* Bottom Section: Copyright & Social Icons */}
      <div className="mt-6 border-t mx-8 border-cream pt-6 flex flex-col md:flex-row items-center justify-between px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} LaScentio. All Rights Reserved.</p>
        <div className="flex  space-x-4 mt-2 md:mt-0">
          <a href="#" target="_blank" className="text-xl "><FaFacebookF /></a>
          <a href="#" className="text-xl "><FaInstagram /></a>
          <a href="#" className="text-xl "><FaTwitter /></a>
          <a href="#" className="text-xl "><FaTiktok /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
