import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

function NewArrivals({ onAddToCart }) {
  const newProducts = products.filter(
    (product) => product.isNew
  );

  return (
    <section className="page-section">

      <div className="page-header">
        <span>جديدنا</span>
        <h1>وصل حديثًا ✨</h1>
        <p>
          اكتشفي آخر المنتجات التي أضفناها إلى المتجر.
        </p>
      </div>

      <div className="products-grid">
        {newProducts.map((product) => (
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

export default NewArrivals;