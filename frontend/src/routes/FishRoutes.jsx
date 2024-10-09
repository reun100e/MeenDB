import { Outlet } from "react-router-dom";
import { FishProvider } from "../components/FishContext";

function FishRoutes() {
  return (
    <FishProvider>
      <Outlet /> {/* Renders child routes */}
    </FishProvider>
  );
}

export default FishRoutes;
