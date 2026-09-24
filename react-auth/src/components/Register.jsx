// src/components/Register.jsx

import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register, user, isLoading } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="route-loading">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        err?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">A</div>

          <h1>Create account</h1>

          <p>
            Create your account to get started.
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">
              Full name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                disabled={isSubmitting}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((value) => !value)
                }
                disabled={isSubmitting}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm password
            </label>

            <div className="password-wrapper">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                disabled={isSubmitting}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (value) => !value
                  )
                }
                disabled={isSubmitting}
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="button-spinner" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>

          <Link to="/login">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Register;
