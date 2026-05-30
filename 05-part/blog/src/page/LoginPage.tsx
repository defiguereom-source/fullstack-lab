import { useState } from "react";
import "../stylesheets/bootstrap-5.3.8-dist/css/bootstrap.min.css";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    console.log(data);
    onLogin();
  };

  return (
<div className="container-fluid bg-dark min-vh-100 d-flex justify-content-center align-items-center">

  <div className="card border-0 shadow-lg p-4" style={{ width: "100%", maxWidth: "420px", backgroundColor: "#1e1e1e", color: "white" }}>

    <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>
    <p className="text-center text-secondary mb-4">Login to your account</p>

    <form onSubmit={handleSubmit}>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control bg-dark text-white border-secondary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control bg-dark text-white border-secondary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Button */}
      <button type="submit" className="btn btn-light w-100 fw-bold mt-3">
        Login
      </button>

    <div className="text-center mt-3">
      <span className="text-secondary">
        Don't have an account?
      </span>
      <a
        type="button"
        className="btn btn-link text-decoration-none"
      >
        Register
      </a>
    </div>
        </form>

      </div>
    </div>
    
  );
};

export default LoginPage;