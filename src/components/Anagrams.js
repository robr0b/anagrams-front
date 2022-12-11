import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Form, Alert} from "react-bootstrap";
import axios from "axios";
import NavigationBarLoggedIn from "./NavigationBarLoggedIn";

function Anagrams() {

    const [word, setWord] = useState("");
    const [userWord, setUserWord] = useState("");
    const [mustLogIn, setMustLogIn] = useState(false);
    const [error, setError] = useState("");
    const [anagrams, setAnagrams] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setUserWord("");
        setError("");
        setAnagrams([]);
        setLoading(true);
        
        if (sessionStorage.getItem("token")) {
            axios.get("https://anagrams-back.herokuapp.com/", 
            { params : {
                word: word,
                email: sessionStorage.getItem("email"),
                token: sessionStorage.getItem("token")
                }
            })
            .then(function (response) {
        
                if (response.data.success) {
                    setAnagrams(response.data.anagrams);
                    setUserWord(word);
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
        <Card style={{ marginLeft:"2rem", width:"30rem" }}>
            <Card.Body>
                <h2>Find anagrams</h2>
                <Card.Text>
                    Enter a word to look for anagrams
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Word</Form.Label>
                        <Form.Control type="text" placeholder="Enter the word" onChange={(e) => setWord(e.target.value)}></Form.Control>
                    </Form.Group>
                    <br/>
                    <Button type="submit" disabled={loading}>Find anagrams</Button>
                </Form>
            </Card.Body>
        </Card>

        <br/>

        {   
            userWord &&

        <Card style={{ marginLeft:"2rem", width:"30rem" }}>
            <Card.Body>
                <h2>Anagrams for {userWord}</h2>
                <Card.Text>
                    Let's see what we found...
                </Card.Text>
                <Card.Text>
                    {anagrams.length === 0 ? "No anagrams have been found! Try a different word!" : anagrams.join(", ")}
                </Card.Text>
            </Card.Body>
        </Card>
        }
        </>
    );
}

export default Anagrams;