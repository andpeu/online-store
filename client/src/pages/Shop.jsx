import React, { useContext, useEffect } from "react";
import TypeBar from "../components/TypeBar/TypeBar";
import BrandBar from "../components/BrandBar/BrandBar";
import DeviceList from "../components/DeviceList/DeviceList";
import { observer } from "mobx-react-lite";
import Context from "..";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pagination/Pages";
import styles from "./styles/Shop.module.css";

const Shop = observer(() => {
    const { device } = useContext(Context);
    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data));
        fetchBrands().then((data) => device.setBrands(data));
        fetchDevices(null, null, 1, 4).then((data) => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, []);

    useEffect(() => {
        fetchDevices(
            device.selectedType.id,
            device.selectedBrand.id,
            device.page,
            4
        ).then((data) => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.page, device.selectedType, device.selectedBrand]);

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <div className={styles.row}>
                    <TypeBar></TypeBar>
                </div>
                <div className={styles.brandbar}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </div>
            </div>
        </div>
    );
});

export default Shop;
