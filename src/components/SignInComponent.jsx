import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading("Please wait...");

    try {
      const userData = new FormData();
      userData.append("email", email);
      userData.append("password", password);

      const response = await axios.post(
        "https://rodfelix.alwaysdata.net/api/signin",
        userData
      );

      if (response.data.user) {
        setSuccess(response.data.message);
        setLoading("");
        // Navigate to home page
        navigate("/");
      } else {
        setError(response.data.message);
        setLoading("");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setLoading("");
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4">
        <h2 className="text-center mb-3">Sign In</h2>

        {loading && <div className="alert alert-warning">{loading}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-dark w-100"
            type="submit"
            disabled={loading !== ""}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;