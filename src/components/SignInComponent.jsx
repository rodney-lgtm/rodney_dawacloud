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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-5 shadow"
        style={{
          width: "100%",
          maxWidth: "500px",  // Increased max width
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center mb-5 fw-bold" style={{ fontSize: "2rem" }}>
          Welcome Back 
        </h2>

        {loading && (
          <div className="alert alert-warning text-center py-2">{loading}</div>
        )}
        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}
        {success && (
          <div className="alert alert-success text-center py-2">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ fontSize: "1.1rem" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-pill py-3" // larger input height
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ fontSize: "1rem" }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ fontSize: "1.1rem" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-pill py-3"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ fontSize: "1rem" }}
            />
          </div>

          <button
            className="btn w-100 text-white rounded-pill"
            style={{
              background: "#212529",
              border: "none",
              padding: "15px", // larger button height
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
            type="submit"
            disabled={loading !== ""}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-4">
          <small style={{ fontSize: "0.95rem" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="fw-bold text-decoration-none">
              Sign Up
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;