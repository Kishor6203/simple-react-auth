// src/pages/Dashboard.jsx

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back, {user?.name}.
          </p>
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <section className="dashboard-content">
        <div className="welcome-card">
          <div className="welcome-icon">
            ✓
          </div>

          <div>
            <h2>Authentication successful</h2>

            <p>
              You are logged in and viewing a
              protected page.
            </p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="info-card">
            <span className="info-label">
              Name
            </span>

            <strong>
              {user?.name}
            </strong>
          </div>

          <div className="info-card">
            <span className="info-label">
              Email
            </span>

            <strong>
              {user?.email}
            </strong>
          </div>

          <div className="info-card">
            <span className="info-label">
              Role
            </span>

            <strong>
              {user?.role}
            </strong>
          </div>

          <div className="info-card">
            <span className="info-label">
              Account created
            </span>

            <strong>
              {user?.createdAt
                ? new Date(
                    user.createdAt
                  ).toLocaleDateString()
                : "N/A"}
            </strong>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;