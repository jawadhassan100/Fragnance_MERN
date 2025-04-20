import { Link } from "react-router-dom"; 

const categories = [
  { id: 1, label: "Men", link: "/products/men" },
  { id: 2, label: "Women", link: "/products/women" },
  { id: 3, label: "Unisex", link: "/products/unisex" },
];

const ProductCategory = () => {
  return (
    <div className="py-16 px-4 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-avenir font-bold mb-10">Shop Perfumes By</h2>

      <div className="flex flex-col md:flex-row justify-center gap-6">
        {categories.map((category) => (
          <Link to={category.link} key={category.id}>
            <div className="border-2 px-12 py-2  text-md font-medium hover:bg-black hover:text-white  transition duration-300">
              {category.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
