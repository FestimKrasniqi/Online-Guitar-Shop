// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Brands from "./pages/Brands";
// import Models from "./pages/Models";
// import Details from "./pages/Details";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/brands" />} />
        <Route path="/brands" element={<Brands />} />
        {/* <Route path="/brands/:brandId" element={<Models />} />
        <Route path="/guitars/:guitarId" element={<Details />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
