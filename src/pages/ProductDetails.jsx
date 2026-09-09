import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products, formatPrice } from "../data/products";

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <section className="page-section">
        <div className="empty-result">
          <span>😔</span>
          <h2>المنتج غير موجود</h2>
          <Link to="/products" className="primary-btn">
            العودة للمنتجات
          </Link>
        </div>
      </section>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <section className="product-details-page">

      <div className="breadcrumb">
        <Link to="/">الرئيسية</Link>
        <span> / </span>
        <Link to="/products">المنتجات</Link>
        <span> / </span>
        <span>{product.name}</span>
      </div>

      <div className="product-details">

        <div className="details-image">
          <img src={product.image} alt={product.name} />

          {product.isOffer && (
            <span className="details-badge">
              عرض خاص
            </span>
          )}
        </div>

        <div className="details-content">

          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="details-rating">
            ⭐⭐⭐⭐⭐
            <span>
              {product.rating} ({product.reviews} تقييم)
            </span>
          </div>

          <div className="details-price">
            <strong>
              {formatPrice(product.price)}
            </strong>

            {product.oldPrice && (
              <del>
                {formatPrice(product.oldPrice)}
              </del>
            )}
          </div>

          <p className="details-description">
            {product.description}
          </p>

          <div className="quantity-box">

            <span>الكمية:</span>

            <div className="quantity-controls">

              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
              >
                −
              </button>

              <strong>{quantity}</strong>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
              >
                +
              </button>

            </div>

          </div>

          <button
            className="add-details-btn"
            onClick={handleAddToCart}
          >
            🛒 أضيفي للسلة
          </button>

          <div className="product-features">

            <div>
              🚚
              <span>توصيل للمنزل</span>
            </div>

            <div>
              🔒
              <span>شراء آمن</span>
            </div>

            <div>
              💜
              <span>خدمة الزبائن</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;