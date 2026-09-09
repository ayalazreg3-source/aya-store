import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Wishlist({
  wishlist,
  onAddToCart,
  onToggleWishlist,
}) {
  return (
    <section className="page-section">

      <div className="page-header">
        <span>Aya Store</span>

        <h1>المفضلة ❤️</h1>

        <p>
         المنتجات التي اعجبتك.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-cart">

          <div className="empty-cart-icon">
            🤍
          </div>

          <h1>
            المفضلة فارغة
          </h1>

          <p>
            لم تضيفي بعد 
          </p>

          <Link
            to="/products"
            className="primary-btn"
          >
            اكتشفي المنتجات 🛍️
          </Link>

        </div>
      ) : (
        <div className="products-grid">

          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default Wishlist;