import { useState } from "react";
import { Button } from "react-bootstrap";
import type { Movie } from "../types/Movie";
import apiClient from "../api/apiClient";

const AddMovie = () => {
  const [movie, setMovie] = useState<Movie>({
    title: "",
    genre: "",
    release_year: 0,
    price: 0,
    images: ["wednesday_1.jpg", "wednesday_2.jpg"],
  });

  const addButton = () => {
    apiClient
      .post("/movies", movie)
      .then(() => alert("ok"))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div style={{ width: "450px", margin: "0 auto" }}>
        <h1>Add a movie!</h1>
        Add Movie Title:{" "}
        <input
          type="text"
          placeholder="Movie Title"
          onChange={(e) => setMovie({ ...movie, title: e.target.value })}
        />
        <br />
        Add Movie Genre:{" "}
        <input
          type="text"
          placeholder="Movie Genre"
          onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
        />
        <br />
        Add Movie Release Year:
        <input
          type="number"
          placeholder="Release Year"
          onChange={(e) =>
            setMovie({ ...movie, release_year: Number(e.target.value) })
          }
        />
        <br />
        Add Movie Price:{" "}
        <input
          type="number"
          placeholder="Price"
          onChange={(e) =>
            setMovie({ ...movie, price: Number(e.target.value) })
          }
        />
        <br />
        <Button onClick={() => addButton()}>Add movie</Button>
      </div>
    </>
  );
};

export default AddMovie;
