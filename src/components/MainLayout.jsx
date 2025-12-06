// 🌐 MainLayout.jsx
// This component is the main wrapper of the whole application.
// It contains the shared UI (Navbar + Footer) and a space where all pages will appear.
// Think of it as the "skeleton" of the website — pages load inside it.

import Navbar from "./UI/Navbar";   // Import the top navigation bar
import Footer from "./UI/Footer";   // Import the bottom footer
import { Outlet } from "react-router-dom";  // Outlet loads the active page inside this layout

function MainLayout() {
  return (
    <div>
      {/* 🔝 Global navigation bar shown on every page */}
      <Navbar />

      {/* 📄 This is where each page will be displayed dynamically */}
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>

      {/* 🔚 Footer shown at the bottom of every page */}
      <Footer />
    </div>
  );
}

export default MainLayout;

