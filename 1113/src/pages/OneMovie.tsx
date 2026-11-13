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
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <div style={{ width: "250px", margin: "0 auto" }}>
        <h1>{movie?.title}</h1>
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
        <h3>Genre: {movie?.genre}</h3>
        <h3>Release year: {movie?.release_year}</h3>
        <h3>Price: {movie?.price}</h3>
      </div>
    </>
  );
};

export default OneMovie;
