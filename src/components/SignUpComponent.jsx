import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpComponent = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading("Submitting data. Please wait...");

    try {
      const userData = new FormData();
      userData.append("username", username);
      userData.append("email", email);
      userData.append("phone", phone);
      userData.append("password", password);

      const response = await axios.post(
        "https://rodfelix.alwaysdata.net/api/signup",
        userData
      );

      if (response.status === 200) {
        setSuccess(response.data.message);
        setLoading("");
        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");
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
        <h2 className="text-center mb-3">Sign Up</h2>

        {loading && <div className="alert alert-warning">{loading}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="tel"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="password"
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/signin">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;