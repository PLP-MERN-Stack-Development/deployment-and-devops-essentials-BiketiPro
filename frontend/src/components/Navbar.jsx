import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear token from context/localStorage
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-semibold">
          GoToBlogs
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          {user && (
            <>
              <Link to="/create-post" className="hover:text-gray-200">
                Create
              </Link>
              <Link to="/profile" className="hover:text-gray-200">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
