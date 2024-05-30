import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import styles from "./styles/Admin.module.css";
const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
        <div className={styles.container}>
            <h1>Админ панель</h1>
            <div className={styles.buttonContainer}>
                <button
                    variant={"outline-dark"}
                    className='mt-2 p-2'
                    onClick={() => setTypeVisible(true)}
                >
                    Добавить тип
                </button>
                <button
                    variant={"outline-dark"}
                    className='mt-2 p-2'
                    onClick={() => setBrandVisible(true)}
                >
                    Добавить бренд
                </button>
                <button
                    variant={"outline-dark"}
                    className='mt-2 p-2'
                    onClick={() => setDeviceVisible(true)}
                >
                    Добавить устройство
                </button>
            </div>
            <CreateBrand
                show={brandVisible}
                onHide={() => setBrandVisible(false)}
            />
            <CreateDevice
                show={deviceVisible}
                onHide={() => setDeviceVisible(false)}
            />
            <CreateType
                show={typeVisible}
                onHide={() => setTypeVisible(false)}
            />
        </div>
    );
};

export default Admin;
