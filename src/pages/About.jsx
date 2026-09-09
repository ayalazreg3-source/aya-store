import { Link } from "react-router-dom";

function About() {
  return (
    <section className="page-section about-page">

      <div className="page-header">
        <span>Our Story</span>
        <h1>من نحن؟ 💜</h1>
        <p>
          تعرفي أكثر على Aya Store.
        </p>
      </div>

      <div className="about-main">

        <div className="about-large-card">
          <div className="about-symbol">
            A
          </div>
        </div>

        <div className="about-text">

          <span>قصتنا</span>

          <h2>
            مرحبًا بكِ في Aya Store
          </h2>

          <p>
            Aya Store هو متجر إلكتروني أنشئ ليقدم
            تجربة تسوق بسيطة، عصرية ومريحة.
          </p>

          <p>
            نؤمن أن اختيار المنتج المناسب لازم يكون
            سهل وواضح، لذلك نهتم بتقديم منتجات مختارة
            بعناية مع معلومات واضحة وأسعار مناسبة.
          </p>

          <p>
            هدفنا هو أن تكون كل عملية شراء تجربة جميلة
            تبدأ من اكتشاف المنتج وتنتهي بوصول طلبكِ
            إلى باب منزلكِ. ✨
          </p>

          <Link
            to="/products"
            className="primary-btn"
          >
            اكتشفي منتجاتنا 🛍️
          </Link>

        </div>

      </div>

      <div className="values-section">

        <div className="section-heading">
          <span>قيمنا</span>
          <h2>وش يهمنا؟ 💎</h2>
        </div>

        <div className="why-grid">

          <div className="why-card">
            <div className="why-icon">💜</div>
            <h3>رضاكِ أولًا</h3>
            <p>
              نهتم بأن تكون تجربتكِ معنا مريحة ومميزة.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">✨</div>
            <h3>الجودة</h3>
            <p>
              نحرص على اختيار منتجات ذات جودة جيدة.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">🤝</div>
            <h3>الثقة</h3>
            <p>
              نبني علاقتنا مع زبائننا على الوضوح والثقة.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;