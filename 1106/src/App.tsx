import { useEffect, useState } from "react";
import "./App.css";
import type { Pizza } from "./types/Pizza";
import apiClient, { BACKEND_URL } from "./api/apiClient";
import { Card, Row } from "react-bootstrap";

function App() {
  const [pizza, setPizza] = useState<Array<Pizza>>([]);

  useEffect(() => {
    apiClient.get("/pizzak").then((response) => {
      setPizza(response.data);
    });
  }, []);

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
              <Card.Footer>{p.ar}</Card.Footer>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </>
  );
}

export default App;
