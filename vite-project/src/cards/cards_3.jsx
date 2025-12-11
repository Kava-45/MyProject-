import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cards_1.css";

const Cards_3 = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedCompositions, setSelectedCompositions] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null); 

  const manufacturers = [
    { name: "Помск", count: null },
    { name: "NGN", count: 78 },
    { name: "KORSON", count: 39 },
    { name: "BARDAHL", count: 142 },
    { name: "PEMCO", count: 58 },
    { name: "CHEMPIOL", count: 43 },
    { name: "Hyundai/Kia", count: 60 },
  ];

  const compositions = [
    { name: "Минеральное", count: 1106 },
    { name: "Полусинтетическое", count: 2555 },
    { name: "Синтетическое", count: 7408 },
  ];

  useEffect(() => {
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

  const toggleFilter = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filteredProducts =
    selectedManufacturers.length === 0 &&
    selectedCompositions.length === 0 &&
    searchTerm.trim() === ""
      ? products
      : products.filter((p) => {
          const byManufacturer =
            selectedManufacturers.length === 0 ||
            selectedManufacturers.some((m) =>
              p.brand.toLowerCase().includes(m.toLowerCase())
            );

          const byComposition =
            selectedCompositions.length === 0 ||
            selectedCompositions.some((c) =>
              (p.title + " " + p.description)
                .toLowerCase()
                .includes(c.toLowerCase())
            );

          const bySearch =
            searchTerm.trim() === "" ||
            (p.title + " " + p.description)
              .toLowerCase()
              .includes(searchTerm.toLowerCase());

          return byManufacturer && byComposition && bySearch;
        });

  const handleAddToCart = async (productId) => {
    setAddingToCart(productId);
    try {
      const response = await fetch(
        `http://localhost:8000/cart/?user_id=1`, // пока user_id=1
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: productId, quantity: 1 }),
        }
      );
      if (!response.ok) throw new Error("Ошибка при добавлении в корзину");
      alert("Товар добавлен в корзину!");
    } catch (err) {
      console.error(err);
      alert("Не удалось добавить товар в корзину");
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <div className="header-center">
          <form
            className="cards-search-form"
            onSubmit={(e) => e.preventDefault()}
          >
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
                    id={`man-${i}`}
                    checked={selectedManufacturers.includes(m.name)}
                    onChange={() => toggleFilter(setSelectedManufacturers, m.name)}
                  />
                  <label htmlFor={`man-${i}`}>
                    {m.name}
                    {m.count && <span className="filter-count">({m.count})</span>}
                  </label>
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
                    id={`comp-${i}`}
                    checked={selectedCompositions.includes(c.name)}
                    onChange={() => toggleFilter(setSelectedCompositions, c.name)}
                  />
                  <label htmlFor={`comp-${i}`}>
                    {c.name} <span className="filter-count">({c.count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="products-main">
          <h1 className="page-title">Моторные масла автомобильные</h1>

          {loading ? (
            <p>Загрузка товаров...</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-badge">{p.badge}</div>
                  <div className="product-code">
                    {p.id} - {p.brand}
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
                    <span className="old-price">{p.oldPrice}</span>
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

export default Cards_3;
