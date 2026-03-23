import axios from "axios";
import { useState } from "react";

const AddProductsComponent = () => {
    let [product_name, setProductName] = useState("")
    let [product_cost, setProductCost] = useState("")
    let [product_category, setProductCategory] = useState("")
    let [product_description, setProductDescription] = useState("")
    let [product_image, setProductImage] = useState("")
    let [loading, setLoading] = useState("")
    let [error, setError] = useState("")
    let [success, setSuccess] = useState("")


    const handlesubmit = async (e) => {
        e.preventDefault()


        setLoading("please wait...")
        setError("")
        setSuccess("")


        try {
            const product_data = new FormData()
            product_data.append("product_name", product_name)
            product_data.append("product_cost", product_cost)
            product_data.append("product_category", product_category)
            product_data.append("product_description", product_description)
            product_data.append("product_image", product_image)

            const response = await axios.post("http://rodfelix.alwaysdata.net/api/add_product", product_data)

            if (response.status === 200) {
                setSuccess(response.data.message)
                setLoading("")



            }

        } catch (error) {
            console.log(error.message)
            setLoading("")
            setError(error.message)

        }



    }




    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Add Products</h2>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                <h5 className="text-warning">{loading}</h5>


                <form onSubmit={handlesubmit}>
                    <input type="text"
                        className="form-control"
                        placeholder="Enter Your Product Name"
                        value={product_name}
                        onChange={(e) => {
                            setProductName(e.target.value)

                        }}
                    />
                    <br />
                    <input type="number"
                        className="form-control"
                        placeholder="Enter the cost "
                        value={product_cost}
                        onChange={(e) => {
                            setProductCost(e.target.value)

                        }}
                    />
                    <br />
                    <select
                        className="form-select"
                        value={product_category}
                        onChange={(e) => { setProductCategory(e.target.value) }}>
                        <option value="">Select category</option>
                        <option value="Television">Malaria Treatment</option>
                        <option value="Phones">Stomach and Digestion</option>
                        <option value="Laptops">Diabetes Care</option>
                        <option value="accessories">Antibiotics</option>
                        <option value="healthcare">Pain and Relief</option>
                    </select>
                    <br />
                    <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Enter Product Description"
                        value={product_description}
                        onChange={(e) => { setProductDescription(e.target.value) }}
                    ></textarea>
                    <br />
                    <label htmlFor="form-label">Product Image</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => { setProductImage(e.target.files[0]) }}
                    />
                    <br />
                    <button className="btn btn-dark">Submit</button>


                </form>

            </div>


        </div>
    )
}
export default AddProductsComponent;