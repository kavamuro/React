import { useState } from "react";
import "./App.css";
import type { Pizza } from "./types/Pizza";
import { pizzak } from "./Pizzak";
import { Button, Card, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const App = () => {
  const [allPizza, setAllPizza] = useState<Array<Pizza>>(pizzak);

  const [nev, setNev] = useState<string>("");
  const [leiras, setLeiras] = useState<string>("");
  const [ar, setAr] = useState<number>(0);
  const [img, setImg] = useState<string>("");

  const generateCard = (p: Pizza, index: number) => {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={p.img} alt="Nem tolt be a kep" />
          <Card.Body>
            <Card.Title>{p.nev}</Card.Title>
            <Card.Text>{p.leiras}</Card.Text>
            <Card.Footer>{p.ar}</Card.Footer>
          </Card.Body>
          <Card.Footer>
            <Button variant="danger" onClick={() => deleteBtn(index)}>
              Delete
            </Button>
          </Card.Footer>
        </Card>
      </>
    );
  };
  const deleteBtn = (index: number) => {
    setAllPizza((p) => p.filter((_, e) => e !== index));
    toast.info("Deleted successfully!");
  };

  const submit = () => {
    if (!nev || !leiras || !ar || !img) {
      toast.warning("Fill out the empty space/spaces!");
      return;
    }
    const ujPizza: Pizza = {
      nev,
      leiras,
      ar,
      img,
    };
    setAllPizza([...allPizza, ujPizza]);
    toast.success("Added successfully!");
  };

  return (
    <>
      <Row>{allPizza.map((e, i) => generateCard(e, i))}</Row>
      <Row>
        <input
          type="text"
          placeholder="Nev"
          onChange={(e) => setNev(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Leiras"
          onChange={(e) => setLeiras(e.target.value)}
        />
        <br />
        <input
          type="Number"
          placeholder="Ar"
          onChange={(e) => setAr(Number(e.target.value))}
        />
        <br />
        <input
          type="text"
          placeholder="imgUrl"
          onChange={(e) => setImg(e.target.value)}
        />
        <br />
        <Button variant="primary" onClick={submit}>
          Add
        </Button>
      </Row>
    </>
  );
};

export default App;
