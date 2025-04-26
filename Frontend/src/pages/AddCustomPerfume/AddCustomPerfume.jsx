import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCustomPerfume } from "../../redux/slice/customPerfumeSlice";

const AddCustomPerfume = () => {
  const dispatch = useDispatch();
  const { loading, error , isCreated} = useSelector((state) => state.customPerfume);

  const [formData, setFormData] = useState({
    perfumeName: "",
    brand: "",
    price: "",
    size: "50ml",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCustomPerfume(formData));
    if (isCreated){
        alert("Custom perfume created successfully!");
        setFormData({
          perfumeName: "",
          brand: "",
          price: "",
          size: "",
        });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-sm shadow-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add Custom Perfume</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Perfume Name</label>
          <input
            type="text"
            name="perfumeName"
            value={formData.perfumeName}
            onChange={handleChange}
            className="w-full p-2 border "
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border "
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Price </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border "
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Size (ml)</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border "
            required
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Perfume"}
        </button>
      </form>
    </div>
  );
};

export default AddCustomPerfume;
