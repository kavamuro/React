import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import { Button } from "react-bootstrap";
import apiClient from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";

const PutPizza = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [pizza, setPizza] = useState<Pizza>({
    nev: "",
    leiras: "",
    ar: 0,
    imageUrl: "",
  });

  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((res) => setPizza(res.data))
      .catch((err) => console.log(err.message));
  }, [id]);

  const saveButton = () => {
    const newPizza: Pizza = {
      nev: pizza.nev,
      leiras: pizza.leiras,
      ar: pizza.ar,
      imageUrl: pizza.imageUrl,
    };

    apiClient
      .put(`/pizzak/${id}`, newPizza)
      .then(() => {
        alert("Sikeres put");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Hiba történt a módosítás során!");
      });
  };

  return (
    <>
      <div style={{ width: "450px", margin: "0 auto" }}>
        <h1>Add a Pizza!</h1>
        Pizza name:
        <input
          type="text"
          placeholder="Pizza name"
          value={pizza.nev}
          onChange={(e) => setPizza({ ...pizza, nev: e.target.value })}
        />
        <br />
        Add Description:
        <input
          type="text"
          placeholder="Pizza description"
          value={pizza.leiras}
          onChange={(e) => setPizza({ ...pizza, leiras: e.target.value })}
        />
        <br />
        Pizza Price:{" "}
        <input
          type="number"
          placeholder="Price"
          value={pizza.ar}
          onChange={(e) => setPizza({ ...pizza, ar: Number(e.target.value) })}
        />
        <br />
        Add imageUrl:
        <input
          type="text"
          placeholder="Pizza Image"
          value={pizza.imageUrl}
          onChange={(e) => setPizza({ ...pizza, imageUrl: e.target.value })}
        />
        <br />
        <Button variant="info" onClick={() => saveButton()}>
          Edit
        </Button>
      </div>
    </>
  );
};

export default PutPizza;
