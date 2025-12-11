import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cards_1.css";

const Cards_19 = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeManufacturers, setActiveManufacturers] = useState([]);
  const [activeCompositions, setActiveCompositions] = useState([]);
  const [user, setUser] = useState(null);

  const manufacturers = [
    "Toyota",
    "BMW",
    "Liqui Moly",
    "CWORKS",
    "FUCHS",
    "Motorcraft",
  ];

  const compositions = [
    "Минеральное",
    "Полусинтетическое",
    "Синтетическое",
  ];

  useEffect(() => {
    // Получаем пользователя из localStorage
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);

    const loadProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products");
        if (!response.ok) throw new Error("Ошибка сети");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const toggleFilter = (value, setter) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const filteredProducts = products.filter((p) => {
    const text = searchTerm.toLowerCase().trim();

    const matchesSearch =
      p.title.toLowerCase().includes(text) ||
      p.brand.toLowerCase().includes(text) ||
      p.description.toLowerCase().includes(text);

    const matchesManufacturer =
      activeManufacturers.length === 0 || activeManufacturers.includes(p.brand);

    const matchesComposition =
      activeCompositions.length === 0 ||
      activeCompositions.some((c) => p.description.includes(c));

    return matchesSearch && matchesManufacturer && matchesComposition;
  });

  const addToCart = async (productId) => {
    if (!user) {
      alert("Сначала войдите в профиль!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/cart/?user_id=${user.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: productId, quantity: 1 }),
        }
      );

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
          <div className="filter-section">
            <h3 className="filter-title">Производитель</h3>
            <ul className="filter-list">
              {manufacturers.map((m, i) => (
                <li key={i} className="filter-item">
                  <input
                    type="checkbox"
                    id={`m-${i}`}
                    checked={activeManufacturers.includes(m)}
                    onChange={() => toggleFilter(m, setActiveManufacturers)}
                  />
                  <label htmlFor={`m-${i}`}>{m}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Состав</h3>
            <ul className="filter-list">
              {compositions.map((c, i) => (
                <li key={i} className="filter-item">
                  <input
                    type="checkbox"
                    id={`c-${i}`}
                    checked={activeCompositions.includes(c)}
                    onChange={() => toggleFilter(c, setActiveCompositions)}
                  />
                  <label htmlFor={`c-${i}`}>{c}</label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="products-main">
          <h1 className="page-title">Масла: Трансмиссионные</h1>

          {loading ? (
            <p>Загрузка товаров...</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-badge">{p.badge}</div>
                  <div className="product-code">
                    {p.id} — {p.brand}
                  </div>
                  <h3 className="product-title">{p.title}</h3>
                  <p className="product-description">{p.description}</p>

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

export default Cards_19;
