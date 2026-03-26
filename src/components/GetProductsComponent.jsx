import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetProductsComponent = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const imgUrl = "https://rodfelix.alwaysdata.net/static/images/";
    const navigate = useNavigate();

    const getProducts = async () => {
        setError("");
        setLoading("Fetching products, please wait...");

        try {
            const response = await axios.get("https://rodfelix.alwaysdata.net/api/get_products");
            if (response.status === 200) {
                setProducts(response.data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading("");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const name = product.product_name.toLowerCase();
        const description = product.product_description.toLowerCase();
        const search = searchTerm.toLowerCase();

        return name.includes(search) || description.includes(search);
    });

    return (
        <div className="row">
            <h3>Available Products</h3>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading && <h6 className="text-danger">{loading}</h6>}
            {error && <h6 className="text-danger">{error}</h6>}

            {filteredProducts.length === 0 && !loading && (
                <p className="text-muted">No products found</p>
            )}

            {filteredProducts.map((product) => (
                <div className="col-md-3 justify-content-center mb-4" key={product.id}>
                    <div className="card shadow card-margin">
                        <img
                            src={imgUrl + product.product_image}
                            alt={product.product_name}
                            className="product_img mt-4"
                        />
                        <div className="card-body">
                            <h5 className="mt-2">{product.product_name}</h5>
                            <p className="text-muted">{product.product_description}</p>
                            <b className="text-warning">{product.product_cost}</b>

                            <div className="mt-3">
                                <button
                                    className="btn btn-dark"
                                    onClick={() => navigate("/makepayment", { state: { product } })}
                                >
                                    Purchase Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GetProductsComponent;