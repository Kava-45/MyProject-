import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cards_1.css";

const Cards_5 = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const sparkFilters = [
    "Свеча зажигания Иридий и Платина",
    "Свеча зажигания Стандарт",
  ];

  useEffect(() => {
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


  const toggleFilter = (name) => {
    setActiveFilters((prev) =>
      prev.includes(name)
        ? prev.filter((f) => f !== name)
        : [...prev, name]
    );
  };


  const filteredProducts = products.filter((p) => {
    const text = searchTerm.toLowerCase().trim();

    const matchesSearch =
      p.title.toLowerCase().includes(text) ||
      p.brand.toLowerCase().includes(text) ||
      p.description.toLowerCase().includes(text);

    const matchesFilter =
      activeFilters.length === 0 ||
      activeFilters.some((filter) => {
        if (filter === "Свеча зажигания Иридий и Платина") {
          return p.title.includes("Иридий") || p.title.includes("Платина");
        }
        if (filter === "Свеча зажигания Стандарт") {
          return p.title.includes("Стандарт");
        }
        return false;
      });

    return matchesSearch && matchesFilter;
  });


  const handleAddToCart = async (productId) => {
    if (!user?.id) {
      alert("Вы не авторизованы! Сначала войдите в систему.");
      return;
    }

    setAddingToCart(productId);

    try {
      const response = await fetch(
        `http://localhost:8000/cart/?user_id=${user.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: productId, quantity: 1 }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Ошибка добавления");
      }

      alert("Товар добавлен в корзину!");
    } catch (err) {
      console.error(err);
      alert("Не удалось добавить в корзину");
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <div className="header-center">
          <form className="cards-search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="cards-search-input"
              placeholder="Поиск свечей зажигания..."
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
        {/* Фильтры */}
        <aside className="filter-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">Тип свечи</h3>
            <ul className="filter-list">
              {sparkFilters.map((filter, idx) => (
                <li key={idx} className="filter-item">
                  <input
                    type="checkbox"
                    id={`spark-${idx}`}
                    checked={activeFilters.includes(filter)}
                    onChange={() => toggleFilter(filter)}
                  />
                  <label htmlFor={`spark-${idx}`}>{filter}</label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Список товаров */}
        <main className="products-main">
          <h1 className="page-title">Свечи зажигания</h1>

          {loading ? (
            <p>Загрузка товаров...</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((p) => (
                <div key={p.id} className="product-card">
                  {p.badge && <div className="product-badge">{p.badge}</div>}

                  <div className="product-code">
                    {p.id} — {p.brand}
                  </div>

                  <h3 className="product-title">{p.title}</h3>

                  <p className="product-description">
                    {p.volume} {p.description}
                  </p>

                  <div className="product-availability">
                    <span className="delivery-date">{p.deliveryDate}</span>
                    <span className="availability-status">{p.availability}</span>
                  </div>

                  <div className="product-price">
                    {p.oldPrice && <span className="old-price">{p.oldPrice}</span>}
                    <span className="current-price">{p.currentPrice}</span>
                  </div>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(p.id)}
                    disabled={addingToCart === p.id}
                  >
                    {addingToCart === p.id ? "Добавление..." : "Добавить в корзину"}
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

export default Cards_5;
