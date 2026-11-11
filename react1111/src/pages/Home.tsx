import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { Card, Carousel, Row } from "react-bootstrap";

const Home = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);

  useEffect(() => {
    apiClient
      .get("/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => err.message);
  }, []);

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
            <Card.Text>{m.genre}</Card.Text>
            <Card.Text>{m.release_year}</Card.Text>
            <Card.Footer>{m.price}</Card.Footer>
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <>
      <Row>{movies.map((e) => generateCard(e))}</Row>
    </>
  );
};

export default Home;
