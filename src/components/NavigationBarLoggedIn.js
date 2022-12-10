import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

function NavigationBarLoggedIn() {

    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.clear();
        navigate("/login");
    }

    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container className="d-flex">
                <Navbar.Brand>Anagrams</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to={"/"}>Find anagrams</Nav.Link>
                    <Nav.Link as={Link} to={"/wordbaseForm"}>Import wordbase</Nav.Link>
                </Nav>

                {sessionStorage.getItem("email") &&
                <Navbar.Text className="me-auto">Logged in as {sessionStorage.getItem("email")}</Navbar.Text>}

                <Button onClick={handleLogout}>Log out</Button>
            </Container>
        </Navbar>
        </>
    )
}
export default NavigationBarLoggedIn;