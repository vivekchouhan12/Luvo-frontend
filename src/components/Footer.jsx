import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 px-6 lg:px-12 py-16">
      {/* Top content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img src="/thelog.jpg" alt="Luvo" className="h-9 w-9 rounded-full object-cover" />
            <span className="text-sm font-semibold tracking-wide bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#0b0b0b,#c9a24d)' }}>
              LUVO
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-600 max-w-xs">
            Luvo — Bhopal Tour Guide. Calm, curated places for explorers, travelers, and locals.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 tracking-wide">Explore</h3>
          <ul className="mt-5 space-y-3">
            <li>
              <Link to="/category/tourist" className="text-sm text-gray-600 hover:text-gray-900 transition">Tourist Locations</Link>
            </li>
            <li>
              <Link to="/category/cafe" className="text-sm text-gray-600 hover:text-gray-900 transition">Cafes</Link>
            </li>
            <li>
              <Link to="/category/event" className="text-sm text-gray-600 hover:text-gray-900 transition">Events</Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition">Home</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 tracking-wide">Resources</h3>
          <ul className="mt-5 space-y-3">
            <li>
              <a href="#privacy" className="text-sm text-gray-600 hover:text-gray-900 transition">Privacy Policy</a>
            </li>
            <li>
              <a href="#changelog" className="text-sm text-gray-600 hover:text-gray-900 transition">Changelog</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 tracking-wide">Contact</h3>
          <ul className="mt-5 space-y-3">
            <li>
              <a href="mailto:hello@luvo.city" className="text-sm text-gray-600 hover:text-gray-900 transition">hello@luvo.city</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Luvo — Bhopal Tour Guide. All rights reserved.</p>

        <span className="hidden md:block w-px h-4 bg-gray-300" />

        <a href="#privacy" className="hover:text-gray-900 transition">Privacy Policy</a>

        <span className="hidden md:block w-px h-4 bg-gray-300" />

        <a href="#changelog" className="hover:text-gray-900 transition">Changelog</a>
      </div>
    </footer>
  );
};

export default Footer;
