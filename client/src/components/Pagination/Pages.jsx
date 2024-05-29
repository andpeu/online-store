import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Context from "../..";
import { Pagination } from "react-bootstrap";
import styles from "./Pages.module.css";

const Page = observer(() => {
    const { device } = useContext(Context);

    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for (let index = 0; index < pageCount; index++) {
        pages.push(index + 1);
    }
    return (
        <Pagination className='mt-3'>
            {pages.map((page) => (
                <Pagination.Item
                    className={styles.button}
                    key={page}
                    active={device.page === page}
                    onClick={() => device.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    );
});

export default Page;
