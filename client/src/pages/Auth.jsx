import React, { useContext, useState } from "react";
import { Container, Form, Card, Button, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import Context from "../index";
import { initializeCart } from "../pages/CartPage";
import styles from "./styles/Auth.module.css";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user);
            user.setIsAuth(true);
            initializeCart();
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className={styles.container}>
            <div
                style={{ width: 600 }}
                className={styles.containerChild}
            >
                <h2 className='m-auto'>
                    {isLogin ? "Авторизация" : "Регистрация"}
                </h2>
                <div className='d-flex flex-column'>
                    <input
                        className='mt-3'
                        placeholder='Введите ваш email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='mt-3'
                        placeholder='Введите ваш пароль...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                    />
                    <div className={styles.bottom}>
                        {isLogin ? (
                            <div className={styles.options}>
                                Нет аккаунта?{" "}
                                <p onClick={() => navigate(REGISTRATION_ROUTE)}>
                                    Зарегистрироваться
                                </p>
                            </div>
                        ) : (
                            <div className={styles.options}>
                                Есть аккаунт?{" "}
                                <p onClick={() => navigate(LOGIN_ROUTE)}>
                                    Войти
                                </p>
                            </div>
                        )}
                        <button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? "Войти" : "Регистрация"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;
