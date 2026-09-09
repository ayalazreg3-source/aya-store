import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

function BestSellers({ onAddToCart }) {
  const bestSellers = products.filter(
    (product) => product.isBestSeller
  );

  return (
    <section className="page-section">

      <div className="page-header">
        <span>الأكثر طلبًا</span>
        <h1>الأكثر مبيعًا 🔥</h1>
        <p>
          المنتجات التي اختارها وأحبها زبائن Aya Store.
        </p>
      </div>

      <div className="products-grid">
        {bestSellers.map((product) => (
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

export default BestSellers;