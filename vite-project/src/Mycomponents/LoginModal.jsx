import React, { useRef, useState, useEffect } from "react";
import "./header.css";

const LoginModal = ({ loginData, handleInputChange, handleKeyDown, handleLoginSubmit, closeLoginModal }) => {
  const modalRef = useRef(null);
  const emailInputRef = useRef(null);
  const [isRegister, setIsRegister] = useState(false);

 /* фокус на поле email */
  useEffect(() => {
    setTimeout(() => emailInputRef.current?.focus(), 50);
  }, [isRegister]);

  /* закрываем при клике окно для входа  */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeLoginModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeLoginModal]);


  /* переключение вкладок   */
  const handleTabSwitch = () => {
    setIsRegister(!isRegister);
    handleInputChange({ target: { name: "email", value: "" } });
    handleInputChange({ target: { name: "password", value: "" } });
  };

  /* отправка данных   */
  const onSubmit = (e) => handleLoginSubmit(e, isRegister);

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h2>{isRegister ? "Регистрация" : "Вход в аккаунт"}</h2>
          <button className="modal-close" onClick={closeLoginModal}>×</button>
        </div>

        <form onSubmit={onSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              ref={emailInputRef}
              type="email"
              name="email"
              value={loginData?.email || ""}
              onChange={handleInputChange}
              onKeyDown={(e) => handleKeyDown(e, "password")}
              placeholder="your@email..."
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={loginData?.password || ""}
              onChange={handleInputChange}
              onKeyDown={(e) => handleKeyDown(e, "submit")}
              placeholder="Введите пароль"
              required
            />
          </div>

          <button type="submit" className="login-button">
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </button>

          /* смена вкладок */
          <div className="login-links">
            {isRegister ? (
              <span className="login-text">
                Уже есть аккаунт?
                <button type="button" className="register-switch-btn" onClick={handleTabSwitch}>
                  Войти
                </button>
              </span>
            ) : (
              <span className="login-text">
                Нет аккаунта?
                <button type="button" className="register-switch-btn" onClick={handleTabSwitch}>
                  Зарегистрироваться
                </button>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
