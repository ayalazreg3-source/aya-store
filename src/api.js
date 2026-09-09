const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://aya-store-3.onrender.com";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("aya-token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "حدث خطأ في الخادم");
  }

  return data;
}

export async function getProducts({
  search = "",
  category = "",
  sort = "",
} = {}) {
  const params = new URLSearchParams();

  if (search) params.set("search", search);

  if (category && category !== "الكل") {
    params.set("category", category);
  }

  if (sort && sort !== "default") {
    params.set("sort", sort);
  }

  const query = params.toString();

  return apiFetch(`/api/products${query ? `?${query}` : ""}`);
}

export function getProduct(id) {
  return apiFetch(`/api/products/${id}`);
}

export function createOrder(order) {
  return apiFetch("/api/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
}

export function loginUser(email, password) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function registerUser(name, email, password) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}