import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBundle } from "../../redux/slice/bundleSlice";

const AddBundle = () => {
  const dispatch = useDispatch();
  const { loading, error , success} = useSelector((state) => state.bundle);

  const [formData, setFormData] = useState({
    title: "",
    mainImage: null,
    size: "100ml",
    options: [{ label: "", perfumes: [{ name: "", price: "" }] }],
  });

  // Log any errors from the slice
  useEffect(() => {
    if (error) {
      console.error("Bundle creation error:", error);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    console.log("Selected file:", e.target.files[0]);
    setFormData((prev) => ({ ...prev, mainImage: e.target.files[0] }));
  };

  const handleOptionChange = (optIndex, field, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[optIndex][field] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handlePerfumeChange = (optIndex, perfumeIndex, field, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[optIndex].perfumes[perfumeIndex][field] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleAddOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { label: "", perfumes: [{ name: "", price: "" }] }],
    }));
  };

  const handleAddPerfume = (optIndex) => {
    const updatedOptions = [...formData.options];
    updatedOptions[optIndex].perfumes.push({ name: "", price: "" });
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log formData for debugging


    

    dispatch(createBundle(formData));
    if (success) {
      alert("Bundle created successfully!");
      setFormData({
        title: "",
        mainImage: null,
        size: "100ml",
        options: [{ label: "", perfumes: [{ name: "", price: "" }] }],
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Create Perfume Bundle</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Bundle Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <input
          type="file"
          name="mainImage"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border"
          required
        />
        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        >
          <option value="50ml">50ml</option>
          <option value="100ml">100ml</option>
          <option value="200ml">200ml</option>
        </select>

        {formData.options.map((opt, optIdx) => (
          <div key={optIdx} className="border p-4 bg-gray-50 mb-4">
            <input
              type="text"
              placeholder="Option Label (e.g. Morning Set)"
              value={opt.label}
              onChange={(e) => handleOptionChange(optIdx, "label", e.target.value)}
              className="w-full mb-2 p-2 border"
              required
            />
            {opt.perfumes.map((p, pIdx) => (
              <div key={pIdx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Perfume Name"
                  value={p.name}
                  onChange={(e) => handlePerfumeChange(optIdx, pIdx, "name", e.target.value)}
                  className="flex-1 p-2 border"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={p.price}
                  onChange={(e) => handlePerfumeChange(optIdx, pIdx, "price", e.target.value)}
                  className="w-32 p-2 border"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddPerfume(optIdx)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              + Add Perfume
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddOption}
          className="bg-blue-100 px-4 py-2 mr-2"
        >
          + Add Option
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Creating..." : "Create Bundle"}
        </button>
      </form>
    </div>
  );
};

export default AddBundle;
