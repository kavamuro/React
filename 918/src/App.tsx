import { useState } from "react";
import "./App.css";

function App() {
  const [szam, setSzam] = useState<number>(0);
  const [szam2, setSzam2] = useState<number>(0);
  return (
    <>
      <h1>Hello World</h1>
      <h2>
        megadott stoveg: {szam}, megadott szam: {szam2}
      </h2>
      <input type="number" onChange={(e) => setSzam(Number(e.target.value))} />
      <input type="number" onChange={(e) => setSzam2(Number(e.target.value))} />
      <button onClick={() => alert(`${szam + szam2}`)}>kattints ide</button>
    </>
  );
}

export default App;
