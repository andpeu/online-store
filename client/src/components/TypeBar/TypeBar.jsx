import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Context from "../..";
import { ListGroup } from "react-bootstrap";
import styles from "./TypeBar.module.css";

const TypeBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <ListGroup className={styles.container}>
            {device.types.map((type) => (
                <ListGroup.Item
                    className={styles.item}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default TypeBar;
