import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

function Products({
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "الكل" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("الكل");
    setSort("default");
  };

  return (
    <section className="page-section">

      <div className="page-header">
        <span>Aya Store</span>

        <h1>
          جميع المنتجات 🛍️
        </h1>

        <p>
          اكتشفي مجموعتنا واختاري المنتجات التي تناسبكِ.
        </p>
      </div>

      <div className="search-box">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="ابحثي عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            className="clear-search"
            onClick={() => setSearch("")}
          >
            ✕
          </button>
        )}

      </div>

      <div className="filters">

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="الكل">
            كل المنتجات
          </option>

          <option value="الأكثر مبيعًا">
            🔥 الأكثر مبيعًا
          </option>

          <option value="وصل حديثًا">
            ✨ وصل حديثًا
          </option>

          <option value="العروض">
            🎁 العروض
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="default">
            الترتيب الافتراضي
          </option>

          <option value="low">
            السعر: من الأقل للأعلى
          </option>

          <option value="high">
            السعر: من الأعلى للأقل
          </option>

          <option value="rating">
            ⭐ الأعلى تقييمًا
          </option>
        </select>

      </div>

      <div className="products-result-header">

        <strong>
          {filteredProducts.length} منتجات
        </strong>

        {(search ||
          category !== "الكل" ||
          sort !== "default") && (
          <button
            onClick={clearFilters}
            className="reset-filters"
          >
            إعادة ضبط الفلاتر ↻
          </button>
        )}

      </div>

      <div className="products-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
            />
          ))

        ) : (

          <div className="empty-result">

            <span>🔎</span>

            <h3>
              ما لقيناش المنتج 😔
            </h3>

            <p>
              جربي كلمة بحث أخرى أو أعيدي ضبط الفلاتر.
            </p>

            <button
              onClick={clearFilters}
              className="primary-btn"
            >
              عرض كل المنتجات
            </button>

          </div>

        )}

      </div>

    </section>
  );
}

export default Products;