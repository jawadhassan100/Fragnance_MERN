import { useEffect, useState } from "react"
import FAQ from "./components/FAQ/FAQ"
import Footer from "./components/Footer/Footer"
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs"
import { FaArrowUp, FaWhatsapp } from "react-icons/fa"
import ProductCategory from "./components/ProductCategory/ProductCategory"
import Features from "./components/Features/Features"
import Hero from "./components/Hero/Hero"
import ShopNow from "./components/ShopNow/ShopNow"
import OurBestSeller from "./components/OurBestSeller/OurBestSeller"
import NewArrivals from "./components/NewArrivals/NewArrivals"
import Newsletter from "./components/NewsLetter/NewsLetter"
import Reviews from "./components/Reviews/Reviews"
import AboutPreview from "./components/AboutPreview/AboutPreview"
import FakeNotifications from "./components/FakeNotification/FakeNotification"
import PerfumeImpressions from "./components/PerfumeImpression/PerfumeImpression"


const HomePage = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);

    const phoneNumber = '+923369894297'
    const handleClick = () => {
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
    };
  
    useEffect(() => {
        window.scrollTo(0, 0);
        window.history.scrollRestoration = 'manual';
      
        const handleScroll = () => {
          if (window.scrollY > 110) {
            setShowScrollButton(true);
          } else {
            setShowScrollButton(false);
          }
        };
      
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);


    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

  return (
    <div className="overflow-hidden">
    {/* <Header/> */}
    <Hero/>
    <ProductCategory/>
    <ShopNow/>
    <OurBestSeller/>
    <NewArrivals/>
    <PerfumeImpressions/>
    {/* <ProductSlider/> */}
    <WhyChooseUs/>
    <AboutPreview/>
    <Features/>
    <Reviews/>
    <FAQ/>
    <Newsletter/>
    <Footer/>
    <FakeNotifications/>
    {showScrollButton && (
        <button
          onClick={handleClick}
      className="fixed bottom-20 right-4 p-3 bg-green-500 rounded-full shadow-lg cursor-pointer hover:bg-green-600"
    >
      <FaWhatsapp size={30} color="white" />
        </button>
      )}
    {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition-all duration-300"
        >
          <FaArrowUp className='text-xl'/>
        </button>
      )}
    </div>
  )
}

export default HomePage