import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/slice/perfumeSlice";

const AddProduct = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.perfume);
  
    const [product, setProduct] = useState({
      name: "",
      subtitle: "",
      brand: "",
      description: "",
      weight: "",
      price: "",
      salePrice: "",
      size: "",
      categories: "",
      Longevity: "",
      Sillage: "",
      stock: "",
    });
  
    const [images, setImages] = useState([]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    };
  
    const handleImageChange = (e) => {
      setImages([...e.target.files]);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const fullProduct = { ...product, images };
      dispatch(addProduct(fullProduct));
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add New Product</h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "name",
            "subtitle",
            "brand",
            "description",
            "weight",
            "price",
            "salePrice",
            "size",
            "stock",
            "Longevity",
          ].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              type={field === "price" || field === "salePrice" || field === "size" || field === "Longevity" ? "number" : "text"}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={product[field]}
              onChange={handleChange}
              required
            />
          ))}
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            name="categories"
            value={product.categories}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="For Both">For Both</option>
            <option value="For Her">For Her</option>
            <option value="For Him">For Him</option>
          </select>
  
          <select
            name="Sillage"
            value={product.Sillage}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="">-- Select Sillage --</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="strong">Strong</option>
            <option value="intense">Intense</option>
          </select>
        </div>
  
        <div>
          <label className="block mb-2 font-medium">Upload Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
  
        {error && <p className="text-red-500 text-sm">{error}</p>}
  
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    );
  };

export default AddProduct