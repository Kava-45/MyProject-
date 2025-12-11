import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./profile.css";

const Favorite = ({
  name = "Kava",
  balance = "0 ₽",
  registered = "22.10.2025",
  avatarUrl = null,
  logoSrc = "Logo_1_3.jpg",
  initialItems = [], 
}) => {
  const [activeTab, setActiveTab] = useState("wishlist");
  const [items, setItems] = useState(initialItems);

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="profile-container">
      <div className="profile-layout">
        <div className="profile-left">
          <Link to="/" className="profile-logo-wrapper" aria-label="Главная">
            <img src={logoSrc} alt="logo" />
          </Link>
        </div>

        <aside className="profile-right">
          <div className="profile-card">
            <div className="avatar-wrap">
              <img
                src={
                  avatarUrl ||
                  "https://avatars.mds.yandex.net/i?id=97f82bff9a8a96c471218fbf0dd4790ab4f710a8-5253174-images-thumbs&n=13"
                }
                alt={`${name} avatar`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="profile-info" style={{ flex: 1 }}>
              <h2 className="profile-name">{name}</h2>

              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                <span className="amount">{balance}</span>
                <button className="btn-recharge" type="button">Пополнение</button>
              </div>

              <div style={{ color: "#8f9698", fontSize: 13 }}>
                Дата регистрации: <span>{registered}</span>
              </div>
            </div>
          </div>

          <nav className="side-tabs" aria-label="вкладки">
            <button
              className={`side-tab ${activeTab === "wishlist" ? "active" : ""}`}
              onClick={() => setActiveTab("wishlist")}
            >
              Желаемое
            </button>

            <button
              className={`side-tab ${activeTab === "favorites" ? "active" : ""}`}
              onClick={() => setActiveTab("favorites")}
            >
              Избранное
            </button>

            <button
              className={`side-tab ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              История
            </button>
          </nav>
          <main className="profile-main">
            {activeTab === "wishlist" && (
              <div className="empty-card">
                <h3 style={{ margin: 0, marginBottom: 8 }}>Ваша вкладка «Желаемое»</h3>
                <div className="favorites-grid">
                  {items.map((it) => (
                    <div key={it.id} className="fav-card">
                      <div className="fav-thumb">
                        <img src={it.img} alt={it.title} />
                      </div>

                      <div className="fav-body">
                        <div className="fav-title">{it.title}</div>
                        <div className="fav-price">{it.price}</div>

                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                          <button className="btn-recharge" onClick={() => alert("Добавлено в корзину")}>Купить</button>
                          <button
                            className="side-tab"
                            onClick={() => removeItem(it.id)}
                            style={{ padding: "6px 10px" }}
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div style={{ color: "#9aa2a3" }}>Пусто — добавьте товары в желаемое.</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="empty-card">
                <h3 style={{ margin: 0, marginBottom: 8 }}>Избранное</h3>
                <p style={{ margin: 0, color: "#8f9698" }}>Здесь будут показаны магазины и коллекции, которые вы пометили как избранные.</p>
              </div>
            )}

            {activeTab === "history" && (
              <div className="empty-card">
                <h3 style={{ margin: 0, marginBottom: 8 }}>История просмотров</h3>
                <p style={{ margin: 0, color: "#8f9698" }}>Последние товары, которые вы просматривали.</p>
              </div>
            )}
          </main>
        </aside>
      </div>
    </div>
  );
};

export default Favorite;
