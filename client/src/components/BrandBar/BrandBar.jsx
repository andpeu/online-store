import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Context from "../..";
import styles from "./BrandBar.module.css";
import { Card, Col } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <Col className='d-flex gap-2'>
            {device.brands.map((brand) => (
                <Card
                    className={styles.brand}
                    style={{ cursor: "pointer" }}
                    key={brand.id}
                    onClick={() => device.setSelectedBrand(brand)}
                    border={
                        brand.id === device.selectedBrand.id
                            ? "danger"
                            : "light"
                    }
                >
                    {brand.name}
                </Card>
            ))}
        </Col>
    );
});

export default BrandBar;
