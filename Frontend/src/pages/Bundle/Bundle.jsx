import { Link } from "react-router-dom";
import img1 from "../../assets/1.jpg";


const products = [
  {
    id: 1,
    name: "Velvet Blossom",
    description: "Inspired by Tom Ford Black Orchid unisex",
    price: "77.50 AED",
    image: img1,
  }
];


const Bundle = () => {
  return (
    <div>
        <Link to="/bundle-detail">
          <div className="w-fit  pt-12 mx-auto p-2">
              {products.map((product) => (
                <div key={product.id} className="p-1">
                  <div className="bg-white shadow-md overflow-hidden group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="p-2 text-left">
                      <h3 className="text-xs font-medium">{product.name}</h3>
                      <p className="text-gray-600 text-[10px]">{product.description}</p>
                      <p className="text-gray-600 text-xs">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Link>
    </div>
  )
}

export default Bundle