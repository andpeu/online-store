import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/consts";
import styles from "./DeviceItem.module.css";
import Context from "../..";
import { Log, ShoppingCart, Star } from "@phosphor-icons/react";
import { addToCart } from "../../pages/CartPage";

const DeviceItem = ({ device, brands }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img
                    onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
                    src={process.env.REACT_APP_API_URL + device.img}
                    alt='product'
                />
                <div className={styles.brand}>
                    {brands.find((item) => item.id === device.brandId).name}
                </div>
                <div className={styles["card-text"]}>
                    <div>
                        {" "}
                        <h1>{device.name}</h1>
                        <h1>$ {device.price}</h1>
                    </div>
                </div>
                <button
                    className={styles.button}
                    onClick={() => addToCart(device)}
                >
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default DeviceItem;
