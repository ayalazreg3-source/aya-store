import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

function Offers({ onAddToCart }) {
  const offers = products.filter(
    (product) => product.isOffer
  );

  return (
    <section className="page-section">

      <div className="page-header offer-page-header">
        <span>لفترة محدودة</span>
        <h1>العروض 🎁</h1>
        <p>
          استفيدي من أفضل الأسعار قبل انتهاء العروض.
        </p>
      </div>

      <div className="products-grid">
        {offers.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

    </section>
  );
}

export default Offers;