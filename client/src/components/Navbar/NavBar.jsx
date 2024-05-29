import React, { useContext, useEffect, useState } from "react";
import Context from "../..";
import {
    ADMIN_ROUTE,
    CART_ROUTE,
    LOGIN_ROUTE,
    SHOP_ROUTE,
} from "../../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { ShoppingCart } from "@phosphor-icons/react";

// расшифрока токена чтобы получить роль юзера
const token = localStorage.getItem("token");
let payload;
if (token) {
    const parts = token.split(".");
    payload = JSON.parse(base64UrlDecode(parts[1]));
}

function base64UrlDecode(str) {
    return decodeURIComponent(
        atob(str.replace(/-/g, "+").replace(/_/g, "/"))
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
}

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        setIsAdmin(false);
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        navigate(SHOP_ROUTE);
    };

    useEffect(() => {
        if (payload && payload.role === "ADMIN") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    return (
        <header className={styles.navbar}>
            <div className={styles.container}>
                <button
                    className={styles.title}
                    style={{
                        fontWeight: "600",
                        fontSize: "20px",
                    }}
                    onClick={() => navigate(SHOP_ROUTE)}
                >
                    Online store
                </button>
                {user.isAuth ? (
                    <div>
                        {isAdmin && (
                            <button
                                className={styles.button}
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Админ панель
                            </button>
                        )}
                        <button
                            className={styles.buttonCart}
                            onClick={() => navigate(CART_ROUTE)}
                        >
                            <ShoppingCart
                                size={32}
                                color='#00000'
                            />
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => logOut()}
                        >
                            Выйти
                        </button>
                    </div>
                ) : (
                    <button
                        className={styles.button}
                        onClick={() => navigate(LOGIN_ROUTE)}
                    >
                        Авторизация
                    </button>
                )}
            </div>
        </header>
    );
});

export default NavBar;
