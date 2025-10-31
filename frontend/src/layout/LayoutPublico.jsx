// src/Layout/PublicLayout.jsx
import React from "react";
import NavbarPublic from "../components/Navbar/NavbarPublico";
import Footer from "../components/Footer/Footer";

export default function LayoutPublico({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarPublic />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
