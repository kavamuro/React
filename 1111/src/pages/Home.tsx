import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import apiClient from "../api/apiClient";

const Home = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);

  useEffect(() => {
    apiClient.get("/movies").then((res) => setMovies(res.data));
  });
};
