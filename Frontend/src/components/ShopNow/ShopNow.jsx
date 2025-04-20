import ElegentCoco from "../../assets/ElegentCoco.jpg";
import AventisNoir from "../../assets/AventisNoir.jpg";

const ShopNow = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 ">
        Shop Now
      </h2>

      <div className="grid grid-cols-1 cursor-pointer md:grid-cols-2 gap-6">
        {/* Image 1 */}
        <div className="overflow-hidden  shadow-lg group">
          <img
            src={ElegentCoco}
            alt="Elegent Coco"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Image 2 */}
        <div className="overflow-hidden  shadow-lg group">
          <img
            src={AventisNoir}
            alt="Aventis Noir"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopNow;
