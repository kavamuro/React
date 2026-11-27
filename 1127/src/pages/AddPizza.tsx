import { useState } from "react";
import type { Pizza } from "../types/Pizza";
import { Button } from "react-bootstrap";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

const AddPizza = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<Pizza>({
    nev: "",
    leiras: "",
    ar: 0,
    imageUrl: "",
  });

  const addButton = () => {
    apiClient
      .post("/pizzak", pizza)
      .then(() => alert("ok"))
      .catch((err) => console.error(err));
    navigate("/");
  };

  return (
    <>
      <div style={{ width: "450px", margin: "0 auto" }}>
        <h1>Add a Pizza!</h1>
        Pizza name:
        <input
          type="text"
          placeholder="Pizza name"
          onChange={(e) => setPizza({ ...pizza, nev: e.target.value })}
        />
        <br />
        Add Description:
        <input
          type="text"
          placeholder="Pizza description"
          onChange={(e) => setPizza({ ...pizza, leiras: e.target.value })}
        />
        <br />
        Pizza Price:{" "}
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPizza({ ...pizza, ar: Number(e.target.value) })}
        />
        <br />
        Add imageUrl:
        <input
          type="text"
          placeholder="Pizza Image"
          onChange={(e) => setPizza({ ...pizza, imageUrl: e.target.value })}
        />
        <br />
        <Button variant="info" onClick={() => addButton()}>
          Add Pizza
        </Button>
      </div>
    </>
  );
};

export default AddPizza;
