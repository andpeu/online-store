import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Context from "../..";
import DeviceItem from "../DeviceItem/DeviceItem";
import styles from "./DeviceList.module.css";
const DeviceList = observer(() => {
    const { device } = useContext(Context);

    const brandsNames = device.brands.map((brand) => brand.name);
    const brandsId = device.brands.map((brand) => brand.id);
    const combinedArray = brandsId.map((id, index) => {
        return { id: id, name: brandsNames[index] };
    });
    // console.log(device.devices);
    return (
        <div className={styles.container}>
            {device.devices.map((item) => (
                <DeviceItem
                    key={item.id}
                    device={item}
                    brands={combinedArray}
                    // brand={device.brands}
                />
            ))}
        </div>
    );
});

export default DeviceList;
