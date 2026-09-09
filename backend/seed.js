import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "منتج مميز",
    price: 2500,
    oldPrice: 3000,
    category: "الأكثر مبيعًا",
    image:
      "https://placehold.co/600x700/F3E8FF/7C3AED?text=Aya+Store",
    description:
      "منتج مميز بجودة عالية وتصميم أنيق من Aya Store.",
    rating: 5,
    reviews: 24,
    isBestSeller: true,
    isNew: false,
    isOffer: true,
    stock: 100,
  },
  {
    name: "وصل حديثًا",
    price: 3200,
    oldPrice: null,
    category: "وصل حديثًا",
    image:
      "https://placehold.co/600x700/FCE7F3/BE185D?text=New",
    description:
      "اكتشفي أحدث المنتجات المتوفرة في متجر Aya Store.",
    rating: 4.8,
    reviews: 15,
    isBestSeller: false,
    isNew: true,
    isOffer: false,
    stock: 100,
  },
  {
    name: "اختيار Aya",
    price: 1900,
    oldPrice: 2400,
    category: "الأكثر مبيعًا",
    image:
      "https://placehold.co/600x700/EDE9FE/6D28D9?text=Best",
    description:
      "اختيار مميز من منتجاتنا الأكثر طلبًا.",
    rating: 4.9,
    reviews: 31,
    isBestSeller: true,
    isNew: false,
    isOffer: true,
    stock: 100,
  },
  {
    name: "عرض خاص",
    price: 2100,
    oldPrice: 2900,
    category: "العروض",
    image:
      "https://placehold.co/600x700/F5D0FE/A21CAF?text=Offer",
    description:
      "استفيدي من هذا العرض لفترة محدودة.",
    rating: 4.7,
    reviews: 18,
    isBestSeller: false,
    isNew: false,
    isOffer: true,
    stock: 100,
  },
  {
    name: "اختيار جديد",
    price: 2800,
    oldPrice: null,
    category: "وصل حديثًا",
    image:
      "https://placehold.co/600x700/FAE8FF/86198F?text=New+Item",
    description:
      "منتج جديد وأنيق متوفر الآن.",
    rating: 4.8,
    reviews: 12,
    isBestSeller: false,
    isNew: true,
    isOffer: false,
    stock: 100,
  },
  {
    name: "الأكثر طلبًا",
    price: 3500,
    oldPrice: 4000,
    category: "الأكثر مبيعًا",
    image:
      "https://placehold.co/600x700/DDD6FE/5B21B6?text=Popular",
    description:
      "واحد من المنتجات المفضلة عند زبائننا.",
    rating: 5,
    reviews: 42,
    isBestSeller: true,
    isNew: false,
    isOffer: true,
    stock: 100,
  },
];

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: products,
  });

  console.log("✅ تم إدخال المنتجات بنجاح!");
}

main()
  .catch((error) => {
    console.error("❌ حدث خطأ:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });