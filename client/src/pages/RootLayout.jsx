import { Outlet } from "react-router-dom";
import Navbar from "../components/custom/Navbar.jsx";

function RootLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default RootLayout;
