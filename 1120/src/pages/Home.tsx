import { useEffect, useState } from "react";
import { Button, Card, Container, Nav, Navbar, Row } from "react-bootstrap";
import type { Pizza } from "../types/Pizza";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pizza, setPizzas] = useState<Array<Pizza>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/pizzak")
      .then((res) => {
        setPizzas(res.data);
      })
      .catch((err) => err.message);
  }, []);

  const deleteButton = (p: Pizza) => {
    apiClient
      .delete(`/pizzak/${p.id}`)
      .then(() => {
        setPizzas((prev) => prev.filter((e) => e.id !== p.id));
        toast.error(`${p.nev} deleted!`);
      })
      .catch((err) => alert(err.message));
  };
  const viewMovie = (p: Pizza) => {
    navigate(`/m/${p?.id}`);
  };
  const editButton = (p: Pizza) => {
    navigate(`/put/${p?.id}`);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/add">Add a Pizza</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>
        {pizza.map((p) => (
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={`${BACKEND_URL}/kepek/${p.imageUrl}`}
            />
            <Card.Body>
              <Card.Title>{p.nev}</Card.Title>
              <Card.Text>{p.leiras}</Card.Text>
              <Card.Footer>{p.ar}</Card.Footer>
            </Card.Body>
            <Card.Footer>
              <Button variant="danger" onClick={() => deleteButton(p)}>
                Delete
              </Button>
              <Button onClick={() => viewMovie(p)}>Full view</Button>
              <Button onClick={() => editButton(p)}>Full view</Button>
            </Card.Footer>
          </Card>
        ))}
      </Row>
    </>
  );
};

export default Home;
