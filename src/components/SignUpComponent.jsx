import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpComponent = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const userData = { username, email, phone, password };
      const response = await axios.post(
        "https://rodfelix.alwaysdata.net/api/signup",
        userData
      );

      if (response.status === 200) {
        setSuccess(response.data.message);
        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-5 shadow"
        style={{
          width: "100%",
          maxWidth: "500px",  // comfortable size
          borderRadius: "15px",
        }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ fontSize: "2rem" }}>
          Create Account
        </h3>

        {loading && (
          <div className="alert alert-warning py-2 text-center">{loading ? "Signing Up..." : "Processing..."}</div>
        )}
        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}
        {success && (
          <div className="alert alert-success py-2 text-center">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control rounded-pill py-2"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control rounded-pill py-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone number</label>
            <input
              type="tel"
              className="form-control rounded-pill py-2"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill py-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="btn w-100 text-white rounded-pill py-2"
            style={{
              background: "#212529",
              border: "none",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/signin" className="text-decoration-none fw-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpComponent;