import { Outlet } from "react-router-dom";
import { FishProvider } from "../components/contexts/FishContext";
import { LocalNameProvider } from "../components/contexts/LocalNameContext";

function FishRoutes() {
  return (
    <FishProvider>
      <LocalNameProvider>
        <Outlet /> {/* Renders child routes */}
      </LocalNameProvider>
    </FishProvider>
  );
}

export default FishRoutes;
