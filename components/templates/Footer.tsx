export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-sky-500 w-100 h-8 text-center text-white text-shadow-black pt-1">
      © {year} K. All rights reserved.
    </footer>
  );
}
