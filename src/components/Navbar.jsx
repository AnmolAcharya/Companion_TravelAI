import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// import jwtDecode from "jwt-decode"; 
// import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Manual Google Login Function
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      try {
        const decodedUser = jwtDecode(credentialResponse.credential);
        setUser(decodedUser);
        localStorage.setItem("user", JSON.stringify(decodedUser));
        console.log("✅ Logged in user:", decodedUser);
      } catch (error) {
        console.error("Google Login Error:", error);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  // Logout Function
  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

    return (
      <nav className="navbar">
        <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src="/plane.jpg" alt="TravelAI Logo" className="logo-img" />
          <span className="logo-text">TravelAI</span>
        </Link>
          {/* <img src="/plane.jpg" alt="TravelAI Logo" className="logo-img" />
          <span className="logo-text">TravelAI</span> */}
        </div>
        <div className="nav-links">
          {user && (
            <div className="user-info">
              <img src={user.picture || "/default-avatar.png"} alt="User Avatar" className="user-avatar" />
              {/* <span>{user.name}</span> */}
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
    );
  }

export default Navbar;
 