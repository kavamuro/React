import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Pizza } from "../types/Pizza";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Carousel, Container, Nav, Navbar } from "react-bootstrap";

const OnePizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<Pizza>();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((res) => setPizza(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const deleteButton = (p: Pizza) => {
    apiClient
      .delete(`/movies/${p.id}`)
      .then(() => {
        toast.error(`${p.nev} deleted!`);
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/add">Add a movie</Nav.Link>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ width: "300px", margin: "0 auto" }}>
        <h1>{pizza?.nev}</h1>
        <img
          src={`${BACKEND_URL}/images/${pizza?.imageUrl}`}
          style={{ width: "300px", height: "450px" }}
        />

        <h2>Leiras: {pizza?.leiras}</h2>
        <h2>Ár: {pizza?.ar}</h2>
        {pizza && <Button onClick={() => deleteButton(pizza)}>Delete</Button>}
      </div>
    </>
  );
};
