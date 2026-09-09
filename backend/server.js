import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

app.use(cors());
app.use(express.json());

const signToken = (user) =>
  jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "غير مصرح" });
  }
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "الجلسة منتهية" });
  }
}

function admin(req, res, next) {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "للمشرف فقط" });
  }
  next();
}

app.get("/api/health", (req, res) => res.json({ ok: true }));

// AUTH
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "املئي المعلومات المطلوبة" });
    }
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ message: "البريد مستعمل من قبل" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, phone, passwordHash }
    });

    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: signToken(user)
    });
  } catch (e) {
    res.status(500).json({ message: "خطأ في التسجيل" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "البريد أو كلمة المرور غير صحيحة" });
    }

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: signToken(user)
    });
  } catch {
    res.status(500).json({ message: "خطأ في تسجيل الدخول" });
  }
});

app.get("/api/auth/me", auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, phone: true, role: true }
  });
  res.json(user);
});

// PRODUCTS
app.get("/api/products", async (req, res) => {
  const { search, category, sort } = req.query;
  let orderBy = { createdAt: "desc" };
  if (sort === "low") orderBy = { price: "asc" };
  if (sort === "high") orderBy = { price: "desc" };
  if (sort === "rating") orderBy = { rating: "desc" };

  const products = await prisma.product.findMany({
    where: {
      ...(category && category !== "الكل" ? { category } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { category: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } }
            ]
          }
        : {})
    },
    orderBy
  });
  res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) }
  });
  if (!product) return res.status(404).json({ message: "المنتج غير موجود" });
  res.json(product);
});

app.post("/api/products", auth, admin, async (req, res) => {
  try {
    const data = req.body;
    const product = await prisma.product.create({ data });
    res.status(201).json(product);
  } catch {
    res.status(400).json({ message: "تعذر إنشاء المنتج" });
  }
});

app.put("/api/products/:id", auth, admin, async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(product);
  } catch {
    res.status(400).json({ message: "تعذر تعديل المنتج" });
  }
});

app.delete("/api/products/:id", auth, admin, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "تم حذف المنتج" });
  } catch {
    res.status(400).json({ message: "لا يمكن حذف المنتج" });
  }
});

// WISHLIST
app.get("/api/wishlist", auth, async (req, res) => {
  const items = await prisma.wishlist.findMany({
    where: { userId: req.user.id },
    include: { product: true }
  });
  res.json(items.map((x) => x.product));
});

app.post("/api/wishlist/:productId", auth, async (req, res) => {
  const productId = Number(req.params.productId);
  const existing = await prisma.wishlist.findUnique({
    where: { userId_productId: { userId: req.user.id, productId } }
  });

  if (existing) {
    await prisma.wishlist.delete({ where: { id: existing.id } });
    return res.json({ favorite: false });
  }

  await prisma.wishlist.create({
    data: { userId: req.user.id, productId }
  });
  res.json({ favorite: true });
});

// ORDERS
app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, phone, wilaya, address, items, userId } = req.body;

    if (!customerName || !phone || !wilaya || !address || !Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: "بيانات الطلب ناقصة" });
    }

    const ids = items.map((x) => Number(x.productId));
    const products = await prisma.product.findMany({
      where: { id: { in: ids } }
    });

    const map = new Map(products.map((p) => [p.id, p]));
    let total = 0;

    for (const item of items) {
      const p = map.get(Number(item.productId));
      const q = Number(item.quantity);
      if (!p || !Number.isInteger(q) || q < 1 || q > p.stock) {
        return res.status(400).json({ message: `المنتج غير متوفر أو الكمية غير صحيحة` });
      }
      total += p.price * q;
    }

    const order = await prisma.$transaction(async (tx) => {
      for (const item of items) {
        await tx.product.update({
          where: { id: Number(item.productId) },
          data: { stock: { decrement: Number(item.quantity) } }
        });
      }

      return tx.order.create({
        data: {
          userId: userId ? Number(userId) : null,
          customerName,
          phone,
          wilaya,
          address,
          total,
          items: {
            create: items.map((item) => {
              const p = map.get(Number(item.productId));
              return {
                productId: p.id,
                name: p.name,
                price: p.price,
                quantity: Number(item.quantity)
              };
            })
          }
        },
        include: { items: true }
      });
    });

    res.status(201).json(order);
  } catch {
    res.status(500).json({ message: "تعذر تسجيل الطلب" });
  }
});

app.get("/api/orders/my", auth, async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(orders);
});

app.get("/api/orders", auth, admin, async (req, res) => {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(orders);
});

app.put("/api/orders/:id/status", auth, admin, async (req, res) => {
  const allowed = ["PENDING", "CONFIRMED", "PREPARING", "SHIPPED", "DELIVERED", "CANCELLED"];
  if (!allowed.includes(req.body.status)) {
    return res.status(400).json({ message: "حالة غير صحيحة" });
  }
  const order = await prisma.order.update({
    where: { id: Number(req.params.id) },
    data: { status: req.body.status }
  });
  res.json(order);
});

// DASHBOARD
app.get("/api/admin/stats", auth, admin, async (req, res) => {
  const [products, users, orders, revenue] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } })
  ]);
  res.json({
    products,
    users,
    orders,
    revenue: revenue._sum.total || 0
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "خطأ في الخادم" });
});

app.listen(PORT, () => {
  console.log(`Aya Store API running on http://localhost:${PORT}`);
});
