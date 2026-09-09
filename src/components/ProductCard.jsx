import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";

function ProductCard({
  product,
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) {
  const isFavorite = wishlist.some(
    (item) => item.id === product.id
  );

  return (
    <div className="product-card">

      <div className="product-image">

        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
          />
        </Link>

        {product.isOffer && (
          <span className="product-badge">
            عرض
          </span>
        )}

        {product.isNew && (
          <span className="product-badge new">
            جديد
          </span>
        )}

        <button
          className={`wishlist-btn ${
            isFavorite ? "favorite" : ""
          }`}
          onClick={() =>
            onToggleWishlist(product)
          }
          title="المفضلة"
        >
          {isFavorite ? "❤️" : "♡"}
        </button>

      </div>

      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        <div className="product-rating">
          ⭐ {product.rating}
          <span>
            ({product.reviews})
          </span>
        </div>

        <div className="product-price">

          <strong>
            {formatPrice(product.price)}
          </strong>

          {product.oldPrice && (
            <del>
              {formatPrice(product.oldPrice)}
            </del>
          )}

        </div>

        <button
          className="add-cart-btn"
          onClick={() =>
            onAddToCart(product)
          }
        >
          🛒 أضيفي للسلة
        </button>

      </div>

    </div>
  );
}

export default ProductCard;