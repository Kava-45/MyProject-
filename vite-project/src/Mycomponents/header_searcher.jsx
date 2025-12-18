import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import "./header.css";

const Header_searcher = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" }); /* пользователь авторизован или нет */
  const [isLoggedIn, setIsLoggedIn] = useState(false);  /* пользователь авторизован или нет */
  const [user, setUser] = useState(null); /* текущий пользователь */

  /* проверка авторизации при загрузке */
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setIsLoggedIn(true);
      setUser(savedUser);
    }
  }, []); 
  
  /* обработка ввода в форму */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextField === "password") {
        document.getElementById("header-password")?.focus();
      } else if (nextField === "submit") {
        handleLoginSubmit(e, false);
      }
    }
  };
  

  /* логин и регистрация */
  const handleLoginSubmit = async (e, isRegister) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) return;

    try {
      const endpoint = isRegister ? "register" : "login";
      const response = await fetch(`http://localhost:8000/users/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        setUser({ id: data.id, email: data.email });
        setShowLoginModal(false);
        setLoginData({ email: "", password: "" });
        localStorage.setItem("user", JSON.stringify({ id: data.id, email: data.email }));
        alert(isRegister ? "Пользователь создан!" : "Вход выполнен!");
      } else {
        alert(data.detail || "Ошибка");
      }
    } catch (err) {
      alert("Ошибка соединения с сервером");
    }
  };


  /* выход из аккаунта  */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };


  /* запрос логина  */
  const askLogin = () => setShowLoginModal(true);

  /* добавление в корзину */ 
  const addToCart = async (productId, quantity = 1) => {
    if (!isLoggedIn) {
      askLogin();
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/cart/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, product_id: productId, quantity }),
      });

      const data = await response.json();
      if (response.ok) alert("Товар добавлен в корзину!");
      else alert(data.detail || "Ошибка при добавлении в корзину");
    } catch (err) {
      alert("Ошибка соединения с сервером");
    }
  };

  /* аватар */
  const Icon = ({ icon, text, onClick }) => (
    <div className="icon-item" onClick={onClick}>
      <i className={icon}></i>
      <span>{text}</span>
    </div>
  );

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <div className="logo">
              <img src="Logo_1_3.jpg" alt="ZAPPER" />
            </div>
            <div className="brand-name">ZAPPER</div>
          </div>

          <div className="search-container">
            <form className="search-form">
              <input type="text" className="search-input" placeholder="Поиск товаров..." />
              <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          <div className="action-icons">
            <Icon
              icon="fas fa-shopping-cart"
              text="Корзина"
              onClick={() => (isLoggedIn ? navigate("/basket") : askLogin())}
            />
            {isLoggedIn ? (
              <>
                <Icon icon="fas fa-user" text={user.email.split("@")[0]} onClick={() => navigate("/profile")} />
                <button onClick={handleLogout} className="logout-btn" type="button">
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </>
            ) : (
              <Icon icon="fas fa-user" text="Войти" onClick={askLogin} />
            )}
          </div>
        </div>
      </header>

        {/* окно для входа  */}
      {showLoginModal && (
        <LoginModal
          loginData={loginData}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          handleLoginSubmit={handleLoginSubmit}
          closeLoginModal={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
};

export default Header_searcher;
