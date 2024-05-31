import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import styles from "./styles/DevicePage.module.css";
import { addToCart } from "./CartPage";

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });

    const { id } = useParams();
    useEffect(() => {
        fetchOneDevice(id).then((data) => setDevice(data));
    }, [id]);

    return (
        <div className={styles.container}>
            <div className={styles.deviceGeneral}>
                <div className={styles.picture}>
                    <h2>{device.name}</h2>
                    <img
                        width={300}
                        height={300}
                        src={process.env.REACT_APP_API_URL + device.img}
                        alt='device'
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <div>
                        <p>$ {device.price}</p>
                        <button onClick={() => addToCart(device)}>
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.description}>
                <h1>Характеристики</h1>

                {device.info.length === 0 ? (
                    <h2>Нет характеристик</h2>
                ) : (
                    <div className={styles.parameters}>
                        {device.info.map((info, index) => (
                            <div
                                key={info.id}
                                style={{
                                    background:
                                        index % 2 === 0 ? "lightgrey" : "white",
                                    padding: 10,
                                }}
                            >
                                <p>
                                    {info.title}: {info.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DevicePage;
