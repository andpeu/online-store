import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import styles from "./index.css";

const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Context.Provider
        value={{
            user: new UserStore(),
            device: new DeviceStore(),
            allDevices: new DeviceStore(),
        }}
    >
        <App />
    </Context.Provider>
);

export default Context;
