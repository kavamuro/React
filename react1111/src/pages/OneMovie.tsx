import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { useParams } from "react-router-dom";
import { Card, Carousel } from "react-bootstrap";

const OneMovie = () => {
  const [movie, setMovie] = useState<Movie>();
  const { id } = useParams();

  useEffect(() => {
    apiClient
      .get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => err.message);
  }, []);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Carousel interval={null}>
            {movie?.images.map((e) => (
              <Carousel.Item>
                <img
                  src={`${BACKEND_URL}/images/${e}`}
                  style={{ width: "250px", height: "400px" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Title>{movie?.title}</Card.Title>
          <Card.Text>{movie?.genre}</Card.Text>
          <Card.Text>{movie?.release_year}</Card.Text>
          <Card.Footer>{movie?.price}</Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};

export default OneMovie;
