import Link from "next/link";
import { useState } from "react";
import NavPC from "../parts/header/NavPC";
import NavSP from "../parts/header/NavSP";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const handleStateChange = (state: { isOpen: boolean }) => {
    if (state.isOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(state.isOpen);
  };
  return (
    <nav
      id="outer-container"
      className="sticky top-0 z-50 bg-sky-500 w-100 h-16"
    >
      <div className="hidden md:flex container items-center justify-between mx-auto w-3/5">
        <Link
          href="/"
          className="text-xl font-medium text-white  text-shadow-black"
        >
          KProgram
        </Link>
        <NavPC />
      </div>

      <NavSP
        isOpen={isOpen}
        handleStateChange={handleStateChange}
        closeMenu={closeMenu}
      />
    </nav>
  );
}
