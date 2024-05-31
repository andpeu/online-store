import React, { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem/CartItem";
import Context from "..";
import { fetchDevices } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import styles from "./styles/CartPage.module.css";

export function initializeCart() {
    let cart = localStorage.getItem("cart");
    if (!cart) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
}
export function addToCart(device) {
    console.log("add to cart");
    let cart = JSON.parse(localStorage.getItem("cart"));
    let existingProduct = cart.find((item) => item.id === device.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: device.id,
            quantity: 1,
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(device) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let productIndex = cart.findIndex((item) => item.id === device.id);

    if (productIndex !== -1) {
        cart[productIndex].quantity -= 1;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

function calculateTotalPrice(cart, devices) {
    return cart.reduce((total, cartItem) => {
        const device = devices.find((device) => device.id === cartItem.id);

        if (device) {
            total += device.price * cartItem.quantity;
        }
        return total;
    }, 0);
}
function calculateTotalAmount(cart, devices) {
    return cart.reduce((total, cartItem) => {
        const device = devices.find((device) => device.id === cartItem.id);

        if (device) {
            total += cartItem.quantity;
        }
        return total;
    }, 0);
}

const CartPage = observer(() => {
    const [priceValue, setPriceValue] = useState(0);

    const { allDevices } = useContext(Context);

    useEffect(() => {
        fetchDevices(null, null, null, null).then((data) => {
            allDevices.setDevices(data);
        });
    }, [allDevices]);

    console.log("allDevices");
    console.log(allDevices);
    console.log(
        allDevices.devices.map((item) => ({
            id: item.id,
            price: item.price,
        }))
    );

    const updateTotalPrice = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalPrice = calculateTotalPrice(
            cart,
            allDevices.devices.map((item) => ({
                id: item.id,
                price: item.price,
            }))
        );
        setPriceValue(totalPrice);
    };

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalPrice = calculateTotalPrice(
            cart,
            allDevices.devices.map((item) => ({
                id: item.id,
                price: item.price,
            }))
        );
        setPriceValue(totalPrice);
    }, [allDevices.devices]);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmount = calculateTotalAmount(
        cart,
        allDevices.devices.map((item) => ({
            id: item.id,
        }))
    );
    console.log(totalAmount);

    return (
        <div className={styles.container}>
            <div>
                {cart.map((item) => (
                    <CartItem
                        key={item.id}
                        cart={item}
                        updateTotalPrice={updateTotalPrice}
                    ></CartItem>
                ))}
            </div>
            <div className={styles.total}>
                <p>Количество позиций: {cart.length}</p>
                <p>Количество товаров: {totalAmount}</p>
                <h1>Итог: {priceValue}$</h1>
            </div>
        </div>
    );
});

export default CartPage;
