import React, { useContext } from "react";
import Context from "..";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <Navbar
            bg='dark'
            data-bs-theme='dark'
        >
            <Container>
                <NavLink
                    style={{ color: "white" }}
                    to={SHOP_ROUTE}
                >
                    Название магазина
                </NavLink>
                {user.isAuth ? (
                    <Nav className='ml-auto'>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                        >
                            Выйти
                        </Button>
                    </Nav>
                ) : (
                    <Nav className='ml-auto'>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Авторизация
                        </Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;
