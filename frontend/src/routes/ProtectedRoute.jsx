import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user === undefined) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
