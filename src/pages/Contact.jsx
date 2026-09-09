import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("من فضلك املئي جميع المعلومات 💜");
      return;
    }

    alert("تم إرسال رسالتك بنجاح 💜");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="page-section contact-page">

      <div className="page-header">
        <span>Aya Store</span>
        <h1>تواصلي معنا 💌</h1>
        <p>
          عندك سؤال أو استفسار؟ نحن هنا لمساعدتكِ.
        </p>
      </div>

      <div className="contact-layout">

        <div className="contact-info">

          <div className="contact-card">
            <div>📞</div>
            <div>
              <h3>الهاتف</h3>
              <p>05 XX XX XX XX</p>
            </div>
          </div>

          <div className="contact-card">
            <div>📧</div>
            <div>
              <h3>البريد الإلكتروني</h3>
              <p>contact@ayastore.dz</p>
            </div>
          </div>

          <div className="contact-card">
            <div>📍</div>
            <div>
              <h3>الموقع</h3>
              <p>الجزائر 🇩🇿</p>
            </div>
          </div>

          <div className="contact-card">
            <div>⏰</div>
            <div>
              <h3>أوقات العمل</h3>
              <p>كل يوم من 09:00 إلى 18:00</p>
            </div>
          </div>

        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <h2>أرسلي لنا رسالة</h2>

          <label>
            الاسم
            <input
              type="text"
              name="name"
              placeholder="اكتبي اسمك"
              value={form.name}
              onChange={handleChange}
            />
          </label>

          <label>
            البريد الإلكتروني
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <label>
            الرسالة
            <textarea
              name="message"
              placeholder="اكتبي رسالتك هنا..."
              value={form.message}
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="primary-btn"
          >
            إرسال الرسالة 💜
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;