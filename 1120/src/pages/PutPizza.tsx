import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import apiClient from "../api/apiClient";
import { useParams } from "react-router-dom";

const PutPizza = () => {
  const { id } = useParams<{ id: string }>();

  const [pizza, setPizza] = useState<Pizza>({
    nev: "",
    leiras: "",
    ar: 0,
    imageUrl: "",
  });

  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((res) => setPizza(res.data))
      .catch((err) => console.log(err.message));
  }, [id]);

  const addButton = () => {
    const newPizza: Pizza = {
      nev: pizza.nev,
      leiras: pizza.leiras,
      ar: pizza.ar,
      imageUrl: pizza.imageUrl,
    };
    apiClient
      .put(`/pizza/${id}`, newPizza)
      .then(() => alert("Sikeres put"))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Pizza</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/add">Add a Pizza</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ width: "450px", margin: "0 auto" }}>
        <h1>Add a Pizza!</h1>
        Pizza name:
        <input
          type="text"
          placeholder="Pizza name"
          value={pizza.nev}
          onChange={(e) => setPizza({ ...pizza, nev: e.target.value })}
        />
        <br />
        Add Description:
        <input
          type="text"
          placeholder="Pizza description"
          value={pizza.leiras}
          onChange={(e) => setPizza({ ...pizza, leiras: e.target.value })}
        />
        <br />
        Pizza Price:{" "}
        <input
          type="number"
          placeholder="Price"
          value={pizza.ar}
          onChange={(e) => setPizza({ ...pizza, ar: Number(e.target.value) })}
        />
        <br />
        Add imageUrl:
        <input
          type="text"
          placeholder="Pizza Image"
          value={pizza.imageUrl}
          onChange={(e) => setPizza({ ...pizza, imageUrl: e.target.value })}
        />
        <br />
        <Button variant="info" onClick={() => addButton()}>
          Add movie
        </Button>
      </div>
    </>
  );
};

export default PutPizza;
