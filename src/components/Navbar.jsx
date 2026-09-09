
import { NavLink } from "react-router-dom";

function Navbar({ cartCount, wishlistCount }) {
  const links = [
    { name: "الرئيسية", path: "/" },
    { name: "الأكثر مبيعًا", path: "/bestsellers" },
    { name: "جميع المنتجات", path: "/products" },
    { name: "وصل حديثًا", path: "/new" },
    { name: "العروض", path: "/offers" },
    { name: "تواصل معنا", path: "/contact" },
    { name: "من نحن", path: "/about" },
  ];

  return (
    <header className="navbar">
      <div className="nav-container">

        <NavLink to="/" className="logo">
          <span>Aya</span> Store
        </NavLink>

        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">

          <NavLink
            to="/products"
            className="nav-icon"
            title="البحث"
          >
            🔍
          </NavLink>

          <NavLink
            to="/wishlist"
            className="nav-icon"
            title="المفضلة"
          >
            ❤️

            {wishlistCount > 0 && (
              <span className="cart-count">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className="cart-icon"
            title="السلة"
          >
            🛒

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </NavLink>

        </div>
      </div>
    </header>
  );
}

export default Navbar;

