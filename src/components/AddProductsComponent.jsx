import axios from "axios";
import { useState } from "react";

const AddProductsComponent = () => {
  const [productName, setProductName] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Submitting product, please wait...");
    setError("");
    setSuccess("");

    try {
      const productData = new FormData();
      productData.append("product_name", productName);
      productData.append("product_cost", productCost);
      productData.append("product_category", productCategory);
      productData.append("product_description", productDescription);
      productData.append("product_image", productImage);

      const response = await axios.post(
        "http://rodfelix.alwaysdata.net/api/add_product",
        productData
      );

      if (response.status === 200) {
        setSuccess(response.data.message);
        setLoading("");
        setProductName("");
        setProductCost("");
        setProductCategory("");
        setProductDescription("");
        setProductImage("");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setLoading("");
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4">
        <h2 className="text-center mb-3">Add Product</h2>

        {loading && <div className="alert alert-warning">{loading}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Product Cost"
              value={productCost}
              onChange={(e) => setProductCost(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <select
              className="form-select"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Malaria Treatment">Malaria Treatment</option>
              <option value="Stomach and Digestion">Stomach and Digestion</option>
              <option value="Diabetes Care">Diabetes Care</option>
              <option value="Antibiotics">Antibiotics</option>
              <option value="Pain and Relief">Pain and Relief</option>
            </select>
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              rows="5"
              placeholder="Enter Product Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">
              Product Image
            </label>
            <input
              type="file"
              className="form-control"
              id="productImage"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
              required
            />
          </div>

          <button
            className="btn btn-dark w-100"
            type="submit"
            disabled={loading !== ""}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductsComponent;