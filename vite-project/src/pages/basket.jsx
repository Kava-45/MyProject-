import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./basket.css";

const Basket = ({ name = "Kava", balance = "0 ₽", registered = "22.10.2025" }) => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* загрузка пользователя */
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const loadCart = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      /* загрузка товаров корзины */
      const res = await fetch(`http://localhost:8000/cart/?user_id=${user.id}`);
      if (!res.ok) throw new Error("Ошибка загрузки корзины");
      const data = await res.json();

      /* загрузка списка товаров   */
      const prodRes = await fetch("http://localhost:8000/products/");
      if (!prodRes.ok) throw new Error("Ошибка загрузки товаров");
      const products = await prodRes.json();

      /* объединение корзины и товаров  */
      const cartItems = data.map(item => {
        const product = products.find(p => p.id === item.product_id);
        return {
          id: item.id,
          title: product?.title || "Без названия",
          price: product?.currentPrice || "0 ₽",
        };
      });
      setItems(cartItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  /* повторное загрузка при изменении user */
  useEffect(() => {
    if (user?.id) loadCart();
  }, [user]);
  
  /* удаление товара из корзины  */
  const removeItem = async (cartItemId) => {
    if (!user?.id) return;
    try {
      const res = await fetch(
        `http://localhost:8000/cart/${cartItemId}?user_id=${user.id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error();

      setItems(prev => prev.filter(i => i.id !== cartItemId));
    } catch (err) {
      alert("Ошибка удаления товара!");
    }
  };

  return (
    <div className="basket-root">
      <div className="basket-container">
        <div className="basket-layout">
          <div className="basket-logo-col">
            <Link to="/" className="basket-logo-link">
              <img src="Logo_1_3.jpg" alt="logo" />
            </Link>
          </div>

          <div className="basket-info-col">
            <div className="basket-info-card">
              <div className="basket-user-info">
                <div className="basket-user-name">{name}</div>
                <div className="basket-balance-row">
                  <span className="basket-balance">{balance}</span>
                </div>
                <div className="basket-register-date">
                  Дата регистрации: <span>{registered}</span>
                </div>
              </div>
            </div>

            <div className="basket-main-content">
              <h2>Корзина</h2>

              {loading ? (
                <p>Загрузка...</p>
              ) : items.length === 0 ? (
                <p>Корзина пуста</p>
              ) : (
                <ul className="basket-items-list">
                  {items.map(item => (
                    <li key={item.id} className="basket-item-card">
                      <div className="basket-item-info">
                        <div>{item.title}</div>
                        <div>{item.price}</div>
                      </div>
                      <button
                        className="basket-remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        Удалить
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
