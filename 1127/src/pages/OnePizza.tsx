import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Pizza } from "../types/Pizza";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const OnePizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<Pizza>();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((res) => setPizza(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const deleteButton = (p: Pizza) => {
    apiClient
      .delete(`/pizzak/${p.id}`)
      .then(() => {
        toast.error(`${p.nev} deleted!`);
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  const goEditButton = (p: Pizza) => {
    navigate(`/put/${p?.id}`);
  };
  return (
    <>
      <div style={{ width: "300px", margin: "0 auto" }}>
        <h1>{pizza?.nev}</h1>
        <img
          src={`${BACKEND_URL}/images/${pizza?.imageUrl}`}
          style={{ width: "300px", height: "450px" }}
        />

        <h2>Leiras: {pizza?.leiras}</h2>
        <h2>Ár: {pizza?.ar}</h2>
        {pizza && (
          <Button variant="danger" onClick={() => deleteButton(pizza)}>
            Delete
          </Button>
        )}
        {pizza && <Button onClick={() => goEditButton(pizza)}>Edit</Button>}
      </div>
    </>
  );
};

export default OnePizza;
