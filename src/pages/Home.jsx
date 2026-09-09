import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

function Home({ onAddToCart }) {
  const bestSellers = products.filter((product) => product.isBestSeller);
  const newProducts = products.filter((product) => product.isNew);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-small">✨ مرحبًا بكِ في</span>

          <h1>
            Aya <span>Store</span>
          </h1>

          <h2>اختاري ما يناسبكِ، ودعي الباقي علينا 💜</h2>

          <p>
            اكتشفي مجموعتنا المختارة بعناية من المنتجات المميزة
            والعروض الخاصة، بتجربة تسوق سهلة وآمنة.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="primary-btn">
              اكتشفي المنتجات 🛍️
            </Link>

            <Link to="/offers" className="secondary-btn">
              شاهدي العروض 🎁
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle">
            <span>💜</span>
          </div>
          <div className="floating-card card-one">
            ✨ منتجات مميزة
          </div>
          <div className="floating-card card-two">
            🎁 عروض خاصة
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="section-heading">
          <span>تسوقي حسب</span>
          <h2>اختاري ما تحبين 💜</h2>
        </div>

        <div className="categories-grid">
          <Link to="/bestsellers" className="category-card">
            <div>🔥</div>
            <h3>الأكثر مبيعًا</h3>
            <p>اختيارات الزبائن</p>
          </Link>

          <Link to="/new" className="category-card">
            <div>✨</div>
            <h3>وصل حديثًا</h3>
            <p>أحدث المنتجات</p>
          </Link>

          <Link to="/offers" className="category-card">
            <div>🎁</div>
            <h3>العروض</h3>
            <p>أسعار مميزة</p>
          </Link>

          <Link to="/products" className="category-card">
            <div>🛍️</div>
            <h3>كل المنتجات</h3>
            <p>اكتشفي المجموعة</p>
          </Link>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="products-section">
        <div className="section-heading">
          <span>الأكثر طلبًا</span>
          <h2>الأكثر مبيعًا 🔥</h2>
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

        <div className="section-button">
          <Link to="/bestsellers" className="outline-btn">
            عرض جميع الأكثر مبيعًا
          </Link>
        </div>
      </section>

      {/* OFFER */}
      <section className="offer-banner">
        <div>
          <span>🎀 عرض خاص لفترة محدودة</span>

          <h2>
            اكتشفي عروض Aya Store
          </h2>

          <p>
            لا تفوتي الفرصة! منتجات مختارة بأسعار مميزة.
          </p>

          <Link to="/offers" className="primary-btn">
            اكتشفي العروض
          </Link>
        </div>

        <div className="offer-icon">
          🎁
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="products-section">
        <div className="section-heading">
          <span>وصل حديثًا</span>
          <h2>أحدث الإضافات ✨</h2>
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

        <div className="section-button">
          <Link to="/new" className="outline-btn">
            اكتشفي المزيد
          </Link>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-section">
        <div className="section-heading">
          <span>لماذا Aya Store؟</span>
          <h2>تجربة تسوق مختلفة 💜</h2>
        </div>

        <div className="why-grid">

          <div className="why-card">
            <div className="why-icon">🚚</div>
            <h3>توصيل سريع</h3>
            <p>
              نوصل طلبكِ إلى باب منزلكِ بكل سهولة.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">🔒</div>
            <h3>دفع آمن</h3>
            <p>
              تجربة شراء بسيطة وآمنة.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">💎</div>
            <h3>جودة مختارة</h3>
            <p>
              نختار المنتجات بعناية من أجلكِ.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">💌</div>
            <h3>خدمة الزبائن</h3>
            <p>
              نحن هنا لمساعدتكِ والإجابة عن أسئلتكِ.
            </p>
          </div>

        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="about-preview">
        <div className="about-image">
          <span>💜</span>
        </div>

        <div className="about-content">
          <span>قصتنا</span>

          <h2>
            أكثر من مجرد متجر...
          </h2>

          <p>
            في Aya Store نؤمن أن التسوق لازم يكون تجربة
            جميلة، بسيطة ومريحة.
          </p>

          <p>
            لذلك نختار منتجاتنا بعناية ونحرص على تقديم
            خدمة مميزة لكل زبونة.
          </p>

          <Link to="/about" className="primary-btn">
            اكتشفي قصتنا
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;