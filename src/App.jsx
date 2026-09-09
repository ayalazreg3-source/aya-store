
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import BestSellers from "./pages/BestSellers";
import NewArrivals from "./pages/NewArrivals";
import Offers from "./pages/Offers";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("aya-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("aya-wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("aya-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("aya-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity,
        },
      ];
    });

    showToast(`تمت إضافة ${product.name} للسلة 🛒💜`);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    if (exists) {
      setWishlist((current) =>
        current.filter((item) => item.id !== product.id)
      );

      showToast("تمت إزالة المنتج من المفضلة 🤍");
    } else {
      setWishlist((current) => [...current, product]);

      showToast("تمت إضافة المنتج للمفضلة ❤️");
    }
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );

    showToast("تم حذف المنتج من السلة 🗑️");
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
      />

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onAddToCart={addToCart}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/products"
            element={
              <Products
                onAddToCart={addToCart}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                onAddToCart={addToCart}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/bestsellers"
            element={
              <BestSellers
                onAddToCart={addToCart}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/new"
            element={
              <NewArrivals
                onAddToCart={addToCart}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/offers"
            element={
              <Offers
                onAddToCart={addToCart}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                setCart={setCart}
              />
            }
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

