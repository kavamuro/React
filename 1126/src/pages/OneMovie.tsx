import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import { useNavigate, useParams } from "react-router-dom";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { Button, Carousel, Container, Nav, Navbar } from "react-bootstrap";
import { toast } from "react-toastify";

const OneMovie = () => {
  const [movie, setMovie] = useState<Movie>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(`/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteButton = (m: Movie) => {
    apiClient
      .delete(`/movies/${m.id}`)
      .then(() => {
        toast.error(`${m.title} deleted!`);
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
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
        <h1>{movie?.title}</h1>
        <Carousel interval={null}>
          {movie?.images.map((e) => (
            <Carousel.Item>
              <img
                src={`${BACKEND_URL}/images/${e}`}
                style={{ width: "300px", height: "450px" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <h2>Genre: {movie?.genre}</h2>
        <h2>Release Year: {movie?.release_year}</h2>
        <h2>Price: {movie?.price}</h2>
        {movie && <Button onClick={() => deleteButton(movie)}>Delete</Button>}
      </div>
    </>
  );
};

export default OneMovie;
