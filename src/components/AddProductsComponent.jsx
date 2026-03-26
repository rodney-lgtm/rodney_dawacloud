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
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-lg p-4 border-0"
        style={{ width: "100%", maxWidth: "500px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 fw-bold">Add New Product</h3>

        {loading && <div className="alert alert-warning text-center">{loading}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && <div className="alert alert-success text-center">{success}</div>}

        <form onSubmit={handleSubmit}>
         
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <label htmlFor="productName">Product Name</label>
          </div>

          
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="productCost"
              placeholder="Product Cost"
              value={productCost}
              onChange={(e) => setProductCost(e.target.value)}
              required
            />
            <label htmlFor="productCost">Product Cost</label>
          </div>

          
          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
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

          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Product Description"
              id="productDescription"
              style={{ height: "120px" }}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            ></textarea>
            <label htmlFor="productDescription">Product Description</label>
          </div>

          
          <div className="mb-4">
            <label className="form-label fw-semibold">Product Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
              required
            />
          </div>

          
          <button
            className="btn btn-dark w-100 py-2 fw-semibold"
            type="submit"
            disabled={loading !== ""}
            style={{ borderRadius: "10px" }}
          >
            {loading ? "Submitting..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductsComponent;