
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or replace with a spinner component
  }

  return currentUser ? children : <Navigate to="/login" replace />;
}
