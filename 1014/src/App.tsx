import { useState } from "react";
import "./App.css";
import type { Champ } from "./types/Champ";
import { Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

function App() {
  const [AllChamp, setAllChamp] = useState<Array<Champ>>([]);

  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [cost, setCost] = useState<number>(0);

  const generateCard = (c: Champ) => {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://images.steamusercontent.com/ugc/868481194745827147/BB6E0142865ECEEDCD1B5A42F784E5040868EED1/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
        />
        <Card.Body>
          <Card.Title>{c.name}</Card.Title>
          <Card.Text>{c.role}</Card.Text>
          <Card.Footer>{c.cost}</Card.Footer>
        </Card.Body>
        <Card.Footer>
          <Button onClick={() => deleteCard(c.name)}>Delete</Button>
        </Card.Footer>
      </Card>
    );
  };

  const deleteCard = (nameToDelete: string) => {
    setAllChamp((e) => e.filter((c) => c.name !== nameToDelete));
    toast.error("Deleted successfully!", { position: "top-center" });
  };

  const submit = () => {
    if (!name || !role || !cost) {
      toast.warning("Fill out the missing data!");
      return;
    }
    const newChamp: Champ = {
      name,
      role,
      cost,
    };
    setAllChamp([...AllChamp, newChamp]);
    toast.success("Added successfully!");
  };

  return (
    <>
      <Row>
        <Col>{AllChamp.map((p) => generateCard(p))}</Col>
        <Col>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <br />
          <input
            type="text"
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
          />
          <br />
          <input
            type="number"
            onChange={(e) => setCost(Number(e.target.value))}
            placeholder="Cost"
          />
          <br />
          <Button onClick={submit}>Add</Button>
        </Col>
      </Row>
    </>
  );
}

export default App;
