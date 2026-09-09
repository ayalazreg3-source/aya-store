
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api";

function Products({
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Products error:", err);
        setError("تعذر تحميل المنتجات حاليًا.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchText = search.trim().toLowerCase();

      const name = product.name?.toLowerCase() || "";
      const productCategory =
        product.category?.toLowerCase() || "";
      const description =
        product.description?.toLowerCase() || "";

      const matchesSearch =
        !searchText ||
        name.includes(searchText) ||
        productCategory.includes(searchText) ||
        description.includes(searchText);

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
  }, [products, search, category, sort]);

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
            السعر: من الأقل إلى الأعلى
          </option>

          <option value="high">
            السعر: من الأعلى إلى الأقل
          </option>

          <option value="rating">
            ⭐ الأعلى تقييمًا
          </option>
        </select>
      </div>

      <div className="products-result-header">
        <strong>
          {loading
            ? "جاري تحميل المنتجات..."
            : `${filteredProducts.length} منتجات`}
        </strong>

        {!loading &&
          (search ||
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

      {loading ? (
        <div className="empty-result">
          <span>⏳</span>

          <h3>
            جاري تحميل المنتجات...
          </h3>

          <p>
            يرجى الانتظار قليلًا.
          </p>
        </div>
      ) : error ? (
        <div className="empty-result">
          <span>⚠️</span>

          <h3>
            {error}
          </h3>

          <p>
            تحقق من اتصال الإنترنت ثم حاول مرة أخرى.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="primary-btn"
          >
            إعادة المحاولة ↻
          </button>
        </div>
      ) : (
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
                لا توجد منتجات حاليًا.
              </h3>

              <p>
                جرّبي كلمة بحث أخرى أو أعيدي ضبط الفلاتر.
              </p>

              <button
                onClick={clearFilters}
                className="primary-btn"
              >
                عرض جميع المنتجات
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Products;

