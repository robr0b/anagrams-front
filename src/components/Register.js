import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import NavigationBarLoggedOut from "./NavigationBarLoggedOut";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError([]);
    axios.post("https://anagrams-back.herokuapp.com/register.php", {
        email: email,
        password: password
      }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
      }).then(function (response) {
        if (response.data.success) {
          sessionStorage.setItem("email", response.data.email);
          sessionStorage.setItem("token", response.data.token);
          navigate("/");
        }
        else {
          setError(response.data.message);
        }
      })
      .catch(function (error) {
        setError([error]);
      });
      setLoading(false);
  }

  return (
    <>
      <NavigationBarLoggedOut/>
      <br/>
      {error.length !== 0 && <Alert variant="danger" style={{ marginLeft:"2rem", width:"30rem" }}>
        <ul>
        {
          error.map(each => <li key={"Error " + error.indexOf(each).toString()}>{each}</li>)
        }
        </ul>
        </Alert>}
      <br/>
      <Card style={{ marginLeft:"2rem", width:"30rem" }}>
        <Card.Body>
          <h2>Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <br/>
            <Button disabled={loading} type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default Register;