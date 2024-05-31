import React, { useEffect, useState } from "react";
import { fetchOneDevice } from "../../http/deviceAPI";
import styles from "./CartItem.module.css";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/consts";
import { removeFromCart } from "../../pages/CartPage";

const CartItem = ({ cart, updateTotalPrice }) => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(cart.quantity);
    const [deviceData, setDeviceData] = useState({});

    useEffect(() => {
        fetchOneDevice(cart.id).then((data) => setDeviceData(data));
    }, [cart.id]);

    const handleRemove = () => {
        removeFromCart(deviceData);
        const updatedCart = JSON.parse(localStorage.getItem("cart"));
        const updatedItem = updatedCart.find(
            (item) => item.id === deviceData.id
        );
        setAmount(updatedItem ? updatedItem.quantity : 0);
        updateTotalPrice();
    };

    if (amount <= 0) return null;

    return (
        <div style={{ color: "white" }}>
            <div className={styles.container}>
                <img
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(DEVICE_ROUTE + "/" + deviceData.id)}
                    src={process.env.REACT_APP_API_URL + deviceData.img}
                    alt=''
                    width={150}
                    height={200}
                />
                <div>
                    <div className={styles.name}>
                        <p>Название</p>
                        <p style={{ fontFamily: ["Montserrat-Bold"] }}>
                            {deviceData.name}
                        </p>
                        <p
                            style={{
                                fontFamily: ["Montserrat-Bold"],
                                fontSize: "20px",
                            }}
                        >
                            $ {deviceData.price}
                        </p>
                    </div>
                    <div className={styles.quantity}>
                        Количество:
                        <p style={{ fontFamily: ["Montserrat-Bold"] }}>
                            {amount}
                        </p>
                    </div>
                    <button
                        className={styles.button}
                        onClick={handleRemove}
                    >
                        Удалить из корзины
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
