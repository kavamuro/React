import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Carousel,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const deleteButton = (m: Movie) => {
    apiClient
      .delete(`/movies/${m.id}`)
      .then(() => {
        setMovies((prev) => prev.filter((e) => e.id !== m.id));
        toast.error(`${m.title} deleted!`);
      })
      .catch((err) => alert(err.message));
  };
  const viewMovie = (m: Movie) => {
    navigate(`/m/${m?.id}`);
  };

  const generateCard = (m: Movie) => {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Carousel interval={null}>
              {m.images.map((e) => (
                <Carousel.Item>
                  <img
                    src={`${BACKEND_URL}/images/${e}`}
                    style={{ width: "250px", height: "400px" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Title>{m.title}</Card.Title>
            <Card.Text>Genre: {m.genre}</Card.Text>
            <Card.Text>Release Year: {m.release_year}</Card.Text>
            <Card.Footer>Price: {m.price}</Card.Footer>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => deleteButton(m)}>Delete</Button>
            <Button onClick={() => viewMovie(m)}>Full view</Button>
          </Card.Footer>
        </Card>
      </>
    );
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>{movies.map((e) => generateCard(e))}</Row>
    </>
  );
};
export default Home;
