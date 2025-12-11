import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./profile.css";

const Profile = ({
  name = "Kava",
  balance = "0 ₽",
  registered = "22.10.2025",
  avatarUrl = null,
  orders = []
}) => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="profile-root">
      <div className="user-profile-container">
        <div className="user-profile-layout">

          <div className="profile-logo-col">
            <Link to="/" className="profile-logo-link" aria-label="Главная">
              <img src="Logo_1_3.jpg" alt="ZAPPER" />
            </Link>
          </div>

          <aside className="profile-info-col">
            <div className="profile-info-card">
              <div className="avatar-container">
                <img
                  src={
                    avatarUrl ||
                    "https://avatars.mds.yandex.net/i?id=97f82bff9a8a96c471218fbf0dd4790ab4f710a8-5253174-images-thumbs&n=13"
                  }
                  alt={`${name} avatar`}
                />
              </div>

              <div className="profile-user-info">
                <h2 className="profile-user-name">{name}</h2>

                <div className="profile-balance-row">
                  <span className="profile-balance">{balance}</span>
                  <button className="btn-topup">Пополнение</button>
                </div>

                <div className="profile-register-date">
                  Дата регистрации: <span>{registered}</span>
                </div>
              </div>
            </div>

            <nav className="user-profile-tabs" aria-label="вкладки">
              <button
                className={`profile-tab-btn ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                Мои заказы
              </button>

              <button
                className={`profile-tab-btn ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                Уведомления
              </button>

              <button
                className={`profile-tab-btn ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                Настройки
              </button>
            </nav>

            <main className="profile-main-content">

              {activeTab === "orders" && (
                <div className="profile-empty-card">
                  <h3 className="block-title">
                    {orders.length ? "Ваши заказы" : "У вас пока нет заказов"}
                  </h3>

                  {orders.length ? (
                    <ul className="profile-orders-list">
                      {orders.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-text">Здесь будут отображаться ваши заказы</p>
                  )}
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="profile-empty-card">
                  <h3 className="block-title">Уведомления</h3>
                  <p className="empty-text">Здесь будут отображаться уведомления</p>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="profile-empty-card">
                  <h3 className="block-title">Настройки</h3>
                  <p className="empty-text">Раздел в разработке</p>
                </div>
              )}

            </main>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Profile;
