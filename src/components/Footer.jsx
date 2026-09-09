import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            <span>Aya</span> Store
          </Link>

          <p>
            متجر إلكتروني عصري يهتم بتقديم منتجات
            مميزة وتجربة تسوق بسيطة، جميلة ومريحة. 💜
          </p>

          <div className="social-links">
            <a href="#" aria-label="Instagram">
              📸
            </a>

            <a href="#" aria-label="Facebook">
              📘
            </a>

            <a href="#" aria-label="TikTok">
              🎵
            </a>

            <a href="#" aria-label="WhatsApp">
              💬
            </a>
          </div>

        </div>

        <div className="footer-column">

          <h3>روابط سريعة</h3>

          <Link to="/">
            الرئيسية
          </Link>

          <Link to="/products">
            جميع المنتجات
          </Link>

          <Link to="/bestsellers">
            الأكثر مبيعًا
          </Link>

          <Link to="/new">
            وصل حديثًا
          </Link>

        </div>

        <div className="footer-column">

          <h3>المتجر</h3>

          <Link to="/offers">
            العروض
          </Link>

          <Link to="/cart">
            السلة
          </Link>

          <Link to="/account">
            حسابي
          </Link>

          <Link to="/about">
            من نحن
          </Link>

        </div>

        <div className="footer-column">

          <h3>تواصلي معنا</h3>

          <p>📞 05 XX XX XX XX</p>
          <p>📧 contact@ayastore.dz</p>
          <p>📍 الجزائر 🇩🇿</p>

          <Link
            to="/contact"
            className="footer-contact"
          >
            أرسلي لنا رسالة →
          </Link>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Aya Store
          — جميع الحقوق محفوظة.
        </p>

        <div>
          <span>💵 الدفع عند الاستلام</span>
          <span>🚚 توصيل للمنزل</span>
        </div>

      </div>

    </footer>
  );
}

export default Footer;