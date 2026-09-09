import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const total = cart.reduce(
    (sum, product) =>
      sum + product.price * product.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="page-section">
        <div className="empty-cart">
          <div className="empty-cart-icon">
            🛒
          </div>

          <h1>السلة فارغة</h1>

          <p>
            مازال ما ضفتي حتى منتج للسلة.
          </p>

          <Link
            to="/products"
            className="primary-btn"
          >
            اكتشفي المنتجات
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section cart-page">

      <div className="page-header">
        <span>Aya Store</span>

        <h1>
          سلة التسوق 🛒
        </h1>

        <p>
          عندك {totalItems} منتج في السلة.
        </p>
      </div>

      <div className="cart-layout">

        <div className="cart-products">

          {cart.map((product) => (
            <div
              className="cart-item"
              key={product.id}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <div className="cart-item-info">

                <h3>
                  {product.name}
                </h3>

                <span>
                  {formatPrice(product.price)}
                </span>

                <div className="cart-quantity">

                  <button
                    onClick={() =>
                      decreaseQuantity(product.id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {product.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(product.id)
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              <div className="cart-item-right">

                <strong>
                  {formatPrice(
                    product.price *
                      product.quantity
                  )}
                </strong>

                <button
                  className="delete-cart"
                  onClick={() =>
                    removeFromCart(product.id)
                  }
                >
                  🗑️
                </button>

              </div>

            </div>
          ))}

        </div>

        <div className="cart-summary">

          <h2>
            ملخص الطلب
          </h2>

          <div className="summary-line">
            <span>
              المنتجات
            </span>

            <strong>
              {totalItems}
            </strong>
          </div>

          <div className="summary-line">
            <span>
              التوصيل
            </span>

            <strong>
              يحدد لاحقًا
            </strong>
          </div>

          <div className="summary-total">
            <span>
              المجموع
            </span>

            <strong>
              {formatPrice(total)}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="checkout-btn"
          >
            متابعة الطلب →
          </Link>

          <Link
            to="/products"
            className="continue-shopping"
          >
            ← مواصلة التسوق
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Cart;