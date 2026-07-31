import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/authenticator";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      navigate("/login");
    }
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
      <button onClick={handleLogout}>Cerrar sesion</button>
    </div>
  );
};
export default Dashboard;
