import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import { useParams } from "react-router-dom";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { Carousel } from "react-bootstrap";

const OneMovie = () => {
  const [movie, setMovie] = useState<Movie>();
  const { id } = useParams();

  useEffect(() => {
    apiClient
      .get(`/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1>{movie?.title}</h1>
      <Carousel interval={null}>
        {movie?.images.map((e) => (
          <Carousel.Item>
            <img
              src={`${BACKEND_URL}/images/${e}`}
              style={{ width: "300px", height: "450" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <h2>Genre: {movie?.genre}</h2>
      <h2>Release Year: {movie?.release_year}</h2>
      <h2>Price: {movie?.price}</h2>
    </>
  );
};

export default OneMovie;
