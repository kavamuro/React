import { useEffect, useState } from "react";
import type { Champ } from "../types/Champ";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { Card, Carousel, Row } from "react-bootstrap";

const Home = () => {
  const [champs, setChamps] = useState<Array<Champ>>([]);

  useEffect(() => {
    apiClient
      .get("/champions")
      .then((res) => setChamps(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const generateCard = (c: Champ) => {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Carousel interval={null}>
              {c.images.map((e) => (
                <Carousel.Item>
                  <img
                    src={`${BACKEND_URL}/images/${e}`}
                    style={{ width: "300px" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Title>{c.name}</Card.Title>
            <Card.Text>
              Role: {c.role} Lane: {c.lane}
            </Card.Text>
            <Card.Text> Difficulty: {c.difficulty}</Card.Text>
            <Card.Text>{c.description}</Card.Text>
            <Card.Text>Damage type: {c.damage_type}</Card.Text>
            <Card.Footer>Blue essence cost: {c.blue_essence}</Card.Footer>
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <>
      <Row>{champs.map((e) => generateCard(e))}</Row>
    </>
  );
};

export default Home;
