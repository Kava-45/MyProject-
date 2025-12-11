import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cards_1.css";

const Cards_7 = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({ manufacturer: [], type: [] });
  const [user, setUser] = useState(null);

  // Фильтры
  const manufacturerFilters = [
    "LYNXauto (144)",
    "SUFIX (28)",
    "Hyundai/Kia (311)",
    "Toyota (225)",
    "VAG (146)",
    "Mitsubishi (78)"
  ];

  const typeFilters = [
    "Бескаркасная (монолитная) (4987)",
    "Зимняя (627)",
    "Каркасная (летняя) (767)"
  ];

  // Загружаем товары
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);

    const loadProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products/");
        if (!response.ok) throw new Error("Ошибка сети");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Ошибка загрузки товаров:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Переключение фильтров
  const toggleFilter = (category, name) => {
    setActiveFilters((prev) => {
      const updated = prev[category].includes(name)
        ? prev[category].filter((f) => f !== name)
        : [...prev[category], name];
      return { ...prev, [category]: updated };
    });
  };

  // Фильтрация товаров
  const filteredProducts = products.filter((p) => {
    const text = searchTerm.toLowerCase().trim();
    const matchesSearch =
      p.title.toLowerCase().includes(text) ||
      p.brand.toLowerCase().includes(text) ||
      p.description.toLowerCase().includes(text);

    const matchesManufacturer =
      activeFilters.manufacturer.length === 0 ||
      activeFilters.manufacturer.some((m) => p.brand.includes(m.split(" ")[0]));

    const matchesType =
      activeFilters.type.length === 0 ||
      activeFilters.type.some((t) => p.title.includes(t.split(" ")[0]));

    return matchesSearch && matchesManufacturer && matchesType;
  });

  // Добавить товар в корзину
  const addToCart = async (productId) => {
    if (!user) {
      alert("Сначала войдите в профиль!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/cart/?user_id=${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });

      const data = await response.json();
      if (response.ok) alert("Товар добавлен в корзину!");
      else alert(data.detail || "Ошибка добавления товара");
    } catch (err) {
      alert("Ошибка соединения с сервером");
    }
  };

  // Удалить товар из корзины
  const removeFromCart = async (cartItemId) => {
    if (!user) {
      alert("Сначала войдите в профиль!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/cart/${cartItemId}?user_id=${user.id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) alert("Товар удалён из корзины!");
      else alert(data.detail || "Ошибка при удалении товара");
    } catch (err) {
      alert("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="catalog-page">
      {/* Верхний блок: поиск + корзина */}
      <div className="catalog-header">
        <div className="header-center">
          <form className="cards-search-form">
            <input
              type="text"
              className="cards-search-input"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="cards-search-button">
              <i className="fas fa-search"></i>
            </button>
          </form>

          <div className="header-icons">
            <i
              className="fas fa-shopping-cart icon"
              title="Корзина"
              onClick={() => navigate("/basket")}
            ></i>
          </div>
        </div>
      </div>

      {/* Контент: фильтры и товары */}
      <div className="catalog-content">
        <aside className="filter-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">Производитель</h3>
            <ul className="filter-list">
              {manufacturerFilters.map((m, idx) => (
                <li key={idx} className="filter-item">
                  <input
                    type="checkbox"
                    id={`man-${idx}`}
                    checked={activeFilters.manufacturer.includes(m)}
                    onChange={() => toggleFilter("manufacturer", m)}
                  />
                  <label htmlFor={`man-${idx}`}>{m}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Исполнение</h3>
            <ul className="filter-list">
              {typeFilters.map((t, idx) => (
                <li key={idx} className="filter-item">
                  <input
                    type="checkbox"
                    id={`type-${idx}`}
                    checked={activeFilters.type.includes(t)}
                    onChange={() => toggleFilter("type", t)}
                  />
                  <label htmlFor={`type-${idx}`}>{t}</label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="products-main">
          <h1 className="page-title">Товары</h1>

          {loading ? (
            <p>Загрузка товаров...</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-badge">{p.badge}</div>
                  <div className="product-code">{p.id} — {p.brand}</div>
                  <h3 className="product-title">{p.title}</h3>
                  <p className="product-description">{p.volume} {p.description}</p>
                  <div className="product-availability">
                    <span className="delivery-date">{p.deliveryDate}</span>
                    <span className="availability-status">{p.availability}</span>
                  </div>
                  <div className="product-price">
                    <span className="old-price">{p.oldPrice}</span>
                    <span className="current-price">{p.currentPrice}</span>
                  </div>
                  <button className="add-to-cart-btn" onClick={() => addToCart(p.id)}>
                    Добавить в корзину
                  </button>
                  <button className="remove-from-cart-btn" onClick={() => removeFromCart(p.id)}>
                    Удалить из корзины
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Cards_7;
