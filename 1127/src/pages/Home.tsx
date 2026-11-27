import { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import type { Pizza } from "../types/Pizza";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pizza, setPizzas] = useState<Array<Pizza>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/pizzak")
      .then((res) => {
        setPizzas(res.data);
      })
      .catch((err) => err.message);
  }, []);

  const deleteButton = (p: Pizza) => {
    apiClient
      .delete(`/pizzak/${p.id}`)
      .then(() => {
        setPizzas((prev) => prev.filter((e) => e.id !== p.id));
        toast.error(`${p.nev} deleted!`);
      })
      .catch((err) => alert(err.message));
  };
  const viewButton = (p: Pizza) => {
    navigate(`/pizza/${p?.id}`);
  };
  const goEditButton = (p: Pizza) => {
    navigate(`/put/${p?.id}`);
  };
  return (
    <>
      <Row>
        {pizza.map((p) => (
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={`${BACKEND_URL}/kepek/${p.imageUrl}`}
            />
            <Card.Body>
              <Card.Title>{p.nev}</Card.Title>
              <Card.Text>{p.leiras}</Card.Text>
              <Card.Footer>Ar: {p.ar}</Card.Footer>
            </Card.Body>
            <Card.Footer>
              <Button variant="danger" onClick={() => deleteButton(p)}>
                Delete
              </Button>
              <Button onClick={() => viewButton(p)}>Full view</Button>
              <Button variant="info" onClick={() => goEditButton(p)}>
                Edit Pizza
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </Row>
    </>
  );
};

export default Home;
