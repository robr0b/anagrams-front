import React from "react";
import { Navbar, Container, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

function NavigationBarLoggedOut() {
    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container className="d-flex">
                <Navbar.Brand>Anagrams</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to={"/login"}>Log in</Nav.Link>
                    <Nav.Link as={Link} to={"/register"}>Register</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}
export default NavigationBarLoggedOut;