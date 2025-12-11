import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cards_1.css";

const Cards_13 = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeManufacturers, setActiveManufacturers] = useState([]);
  const [activeVolumes, setActiveVolumes] = useState([]);
  const [activeCompositions, setActiveCompositions] = useState([]);
  const [user, setUser] = useState(null);

  const manufacturers = ["NGN", "KORSON", "BARDAHL", "PEMCO", "CHEMPIOIL", "Hyundai/Kia"];
  const volumes = ["0,3", "1", "10", "20", "200", "4"];
  const compositions = ["Минеральное", "Полусинтетическое", "Синтетическое"];

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);

    const loadProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products");
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

  // -------------------------
  // Переключение фильтров
  // -------------------------
  const toggleFilter = (name, setState) => {
    setState((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  // -------------------------
  // Фильтрация товаров
  // -------------------------
  const filteredProducts = products.filter((p) => {
    const text = searchTerm.toLowerCase().trim();

    const matchesSearch =
      p.title.toLowerCase().includes(text) ||
      p.brand.toLowerCase().includes(text) ||
      p.description.toLowerCase().includes(text);

    const matchesManufacturer =
      activeManufacturers.length === 0 || activeManufacturers.some((m) => p.brand.includes(m));

    const matchesVolume =
      activeVolumes.length === 0 || activeVolumes.some((v) => p.volume.includes(v));

    const matchesComposition =
      activeCompositions.length === 0 || activeCompositions.some((c) => p.description.includes(c));

    return matchesSearch && matchesManufacturer && matchesVolume && matchesComposition;
  });

  // -------------------------
  // Добавление в корзину
  // -------------------------
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

  return (
    <div className="catalog-page">
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

      <div className="catalog-content">
        <aside className="filter-sidebar">
          {/* Производитель */}
          <div className="filter-section">
            <h3 className="filter-title">Производитель</h3>
            <ul className="filter-list">
              {manufacturers.map((m, idx) => (
                <li key={idx} className="filter-item">
                  <input
                    type="checkbox"
                    id={`m-${idx}`}
                    checked={activeManufacturers.includes(m)}
                    onChange={() => toggleFilter(m, setActiveManufacturers)}
                  />
                  <label htmlFor={`m-${idx}`}>{m}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Объём */}
          <div className="filter-section">
            <h3 className="filter-title">Объём</h3>
            <ul className="filter-list">
              {volumes.map((v, idx) => (
                <li key={idx} className="filter-item">
                  <input
                    type="checkbox"
                    id={`v-${idx}`}
                    checked={activeVolumes.includes(v)}
                    onChange={() => toggleFilter(v, setActiveVolumes)}
                  />
                  <label htmlFor={`v-${idx}`}>{v}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Состав */}
          <div className="filter-section">
            <h3 className="filter-title">Состав</h3>
            <ul className="filter-list">
              {compositions.map((c, idx) => (
                <li key={idx} className="filter-item">
                  <input
                    type="checkbox"
                    id={`c-${idx}`}
                    checked={activeCompositions.includes(c)}
                    onChange={() => toggleFilter(c, setActiveCompositions)}
                  />
                  <label htmlFor={`c-${idx}`}>{c}</label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="products-main">
          <h1 className="page-title">Масла и смазки</h1>

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
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(p.id)}
                  >
                    Добавить в корзину
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

export default Cards_13;
