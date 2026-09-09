import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";

function Checkout({ cart, setCart }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    wilaya: "",
    address: "",
  });

  const total = cart.reduce(
    (sum, product) => sum + product.price,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.wilaya || !form.address) {
      alert("من فضلك املئي جميع المعلومات.");
      return;
    }

    alert(
      `شكراً ${form.name} 💜\nتم تسجيل طلبك بنجاح!`
    );

    setCart([]);
  };

  if (cart.length === 0) {
    return (
      <section className="page-section">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>ما كاين حتى طلب</h1>

          <p>
            السلة فارغة، زيدي منتجات قبل إتمام الطلب.
          </p>

          <Link
            to="/products"
            className="primary-btn"
          >
            العودة للمنتجات
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section checkout-page">

      <div className="page-header">
        <span>Aya Store</span>
        <h1>إتمام الطلب 💜</h1>
        <p>
          لا تحتاجين إلى إنشاء حساب لإتمام الطلب.
        </p>
      </div>

      <div className="checkout-layout">

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          <h2>معلومات التوصيل</h2>

          <label>
            الاسم الكامل
            <input
              type="text"
              name="name"
              placeholder="اكتبي اسمك"
              value={form.name}
              onChange={handleChange}
            />
          </label>

          <label>
            رقم الهاتف
            <input
              type="tel"
              name="phone"
              placeholder="05 XX XX XX XX"
              value={form.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            الولاية
            <select
              name="wilaya"
              value={form.wilaya}
              onChange={handleChange}
            >
              <option value="">
                اختاري الولاية
              </option>
              <option>الجزائر</option>
              <option>وهران</option>
              <option>الشلف</option>
              <option>مستغانم</option>
              <option>تيبازة</option>
              <option>البليدة</option>
              <option>عين الدفلى</option>
              <option>تلمسان</option>
              <option>سطيف</option>
              <option>قسنطينة</option>
              <option>عنابة</option>
              <option>باتنة</option>
            </select>
          </label>

          <label>
            العنوان
            <textarea
              name="address"
              placeholder="اكتبي عنوان التوصيل بالتفصيل"
              value={form.address}
              onChange={handleChange}
            />
          </label>

          <div className="payment-method">

            <h3>طريقة الدفع</h3>

            <div className="payment-option">
              💵 الدفع عند الاستلام
            </div>

          </div>

          <button
            type="submit"
            className="checkout-submit"
          >
            تأكيد الطلب 🛍️
          </button>

        </form>

        <div className="checkout-summary">

          <h2>طلبكِ</h2>

          {cart.map((product, index) => (
            <div
              className="checkout-product"
              key={`${product.id}-${index}`}
            >
              <img
                src={product.image}
                alt={product.name}
              />

              <div>
                <strong>{product.name}</strong>
                <span>{formatPrice(product.price)}</span>
              </div>
            </div>
          ))}

          <div className="checkout-total">
            <span>المجموع</span>
            <strong>{formatPrice(total)}</strong>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Checkout;