import React, { useEffect } from "react";
import { useState } from "react";
import NavigationBarLoggedIn from "./NavigationBarLoggedIn";
import { Card, Button, Form, Alert} from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function WordbaseForm() {

    const [url, setUrl] = useState("");
    const [mustLogIn, setMustLogIn] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);
        if (sessionStorage.getItem("token")) {
            axios.post("https://anagrams-back.herokuapp.com/save-wordbase.php", {
                url: url,
                email: sessionStorage.getItem("email"),
                token: sessionStorage.getItem("token")
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                
                if (response.data.success) {
                    setMessage(response.data.message);
                }
                else if (response.data.message === "bad_token") {
                    setMustLogIn(true);
                }
                else {
                    setError(response.data.message);
                }
            })
            .catch(function (error) {
                setError(error);
            });
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!sessionStorage.getItem("email") || !sessionStorage.getItem("token")) {
            navigate("/login");
        }
    });

    return (
        <>
        <NavigationBarLoggedIn/>
        <br/>
        {error && <Alert variant="danger" style={{ marginLeft:"2rem", width:"30rem" }}>{error}</Alert>}
        {
            mustLogIn && 
            <Alert variant="danger" style={{ marginLeft:"2rem", width:"30rem" }}>
                Your token is invalid. <Link to="/login">Log in</Link> to continue
            </Alert>
        }
        {message && <Alert variant="success" style={{ marginLeft:"2rem", width:"30rem" }}>{message}</Alert>}
        <Card style={{ marginLeft:"2rem", width:"30rem" }}>
            <Card.Body>
                <h2>Wordbase form</h2>
                <Card.Text>
                    Please provide a link to a text file with each word on a separate line <br/>
                    <a href="http://www.eki.ee/tarkvara/wordlist/lemmad2013.txt" target="blank">Here's an example</a>
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Link to the wordbase</Form.Label>
                        <Form.Control type="url" placeholder="Enter the link" onChange={(e) => setUrl(e.target.value)}></Form.Control>
                    </Form.Group>
                    <br/>
                    <Button type="submit" disabled={loading}>Import wordbase</Button>
                </Form>
            </Card.Body>
        </Card>
        </>
    );
}

export default WordbaseForm;