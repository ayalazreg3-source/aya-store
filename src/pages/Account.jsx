import { useState } from "react";
import { Link } from "react-router-dom";

function Account() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      isLogin
        ? "تم تسجيل الدخول بنجاح 💜"
        : "تم إنشاء الحساب بنجاح 💜"
    );
  };

  return (
    <section className="page-section account-page">

      <div className="account-box">

        <div className="account-icon">
          👤
        </div>

        <span>Aya Store</span>

        <h1>
          {isLogin
            ? "مرحبًا بعودتكِ 💜"
            : "إنشاء حساب جديد ✨"}
        </h1>

        <p>
          {isLogin
            ? "سجلي الدخول للوصول إلى حسابكِ."
            : "أنشئي حسابًا لمتابعة طلباتكِ بسهولة."}
        </p>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <label>
              الاسم الكامل
              <input
                type="text"
                placeholder="اكتبي اسمك"
              />
            </label>
          )}

          <label>
            البريد الإلكتروني
            <input
              type="email"
              placeholder="example@email.com"
              required
            />
          </label>

          <label>
            كلمة المرور
            <input
              type="password"
              placeholder="••••••••"
              required
            />
          </label>

          <button
            type="submit"
            className="account-submit"
          >
            {isLogin
              ? "تسجيل الدخول"
              : "إنشاء الحساب"}
          </button>

        </form>

        <button
          className="switch-account"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "ليس لديك حساب؟ إنشاء حساب"
            : "لديك حساب؟ تسجيل الدخول"}
        </button>

        <div className="guest-checkout">
          <span>أو</span>

          <Link to="/products">
            متابعة التسوق كزائر 🛍️
          </Link>

          <small>
            لا تحتاجين إلى حساب لإتمام طلبك.
          </small>
        </div>

      </div>

    </section>
  );
}

export default Account;