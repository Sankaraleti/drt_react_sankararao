import { Routes, Route } from "react-router";
import SatelliteTable from "./pages/Table";
import SelectedListPage from "./pages/SelectedListPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SatelliteTable />} />
      <Route path="/selected" element={<SelectedListPage />} />
    </Routes>
  );
};

export default App;
