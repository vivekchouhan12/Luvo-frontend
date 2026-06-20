import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth.jsx";
  
const categories = [
  { name: "Tourist", path: "/category/tourist" },
  { name: "Cafes", path: "/category/cafe" },
  { name: "Events", path: "/category/event" },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, Logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('https://luvo-backend.vercel.app/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    Logout(); // update local UI state
    navigate('/');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="fixed inset-x-0 top-3 z-50">
      <nav
        className="mx-auto max-w-7xl rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40
                   shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                   px-4 md:px-6 py-3 flex items-center justify-between"
      >
        {/* Logo */}
        <div className="flex flex-1 items-center gap-3">
          <Link to="/" aria-label="Home" className="flex items-center gap-2">
            <img
              src="/thelog.jpg"
              alt="Luvo Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="hidden sm:block text-sm font-semibold tracking-wide bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg,#0b0b0b,#c9a24d)' }}>
              LUVO
            </span>
          </Link>
          <button
            className="md:hidden ml-auto rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>

        {/* Categories */}
        <div className="hidden md:flex items-center gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className={`group relative text-sm font-medium transition-colors duration-300 ${
                isActive(cat.path) ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {cat.name}
              <span
                className="absolute -bottom-1 left-1/2 h-[2px] w-0
                           -translate-x-1/2 bg-gradient-to-r
                           from-transparent via-gray-400 to-transparent
                           transition-all duration-300 group-hover:w-full"
              />
            </Link>
          ))}

          
        </div>

        {/* Right actions */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-6">
          

          {isLoggedIn ? (
            <Link
              to="/add-place"
              className="rounded-full bg-gradient-to-r from-[#c9a24d] to-[#e8c56f] px-5 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md"
            >
              Add Place
            </Link>
                ) : null}
            {isLoggedIn ? (    
            <Link
            to="/wishlist"
            className={`text-sm font-medium transition ${isActive('/wishlist') ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}
          >
            Wishlist </Link>
          ) : null}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-full border border-gray-300 px-5 py-1.5 text-sm font-medium text-gray-800 transition-all duration-300 hover:border-gray-500 hover:bg-gray-50"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-gray-300 px-5 py-1.5 text-sm font-medium text-gray-800 transition-all duration-300 hover:border-gray-500 hover:bg-gray-50"
            >
              Login
            </Link>
          )}
               </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full mt-2 mx-4 rounded-2xl border border-white/50 bg-white/90 backdrop-blur-xl p-4 shadow-lg">
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  className={`text-sm font-medium ${isActive(cat.path) ? 'text-gray-900' : 'text-gray-700'}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <div className="h-px bg-gray-200" />
              {isLoggedIn ? (
                <Link
                  to="/add-place"
                  className="rounded-full bg-gradient-to-r from-[#c9a24d] to-[#e8c56f] px-5 py-2 text-sm font-medium text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Add Place
                </Link>
              ) : null}
              {isLoggedIn ? (
                <Link
                  to="/wishlist"
                  className={`text-sm font-medium ${isActive('/wishlist') ? 'text-gray-900' : 'text-gray-700'}`}
                  onClick={() => setMobileOpen(false)}
                >
                  Wishlist
                </Link>
              ) : null}
              {isLoggedIn ? (
                <button
                  onClick={() => { setMobileOpen(false); handleLogout(); }}
                  className="rounded-full border border-gray-300 px-5 py-1.5 text-sm font-medium text-gray-800"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="rounded-full border border-gray-300 px-5 py-1.5 text-sm font-medium text-gray-800"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
