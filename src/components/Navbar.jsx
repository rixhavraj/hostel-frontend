import { NavLink } from "react-router-dom";

const linkClass =
  "px-3 py-2 text-sm font-medium transition hover:text-blue-600";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="text-lg font-semibold tracking-tight">
          A1 <span className="text-blue-600">hostel</span>
        </a>

        <button
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 border border-slate-200"
          aria-label="Open navigation menu"
          onClick={() => {
            const menu = document.getElementById("mobile-nav");
            menu?.classList.toggle("hidden");
          }}
        >
          <span className="material-icons">menu</span>
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/rooms" className={linkClass}>
            Rooms
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <a
            href="#booking"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            Book Now
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-nav" className="lg:hidden hidden border-t bg-white">
        <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/rooms" className={linkClass}>
            Rooms
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  );
}
