import { useState } from "react";

function Penzvalto() {
  const [penz, setPenz] = useState<number>();
  const [eredmeny, setEredmeny] = useState<number>();
  const [valasztott, setValasztott] = useState<string>("");

  return (
    <>
      <h1>Pénzváltó</h1>

      <input
        onChange={(e) => setPenz(Number(e.target.value))}
        type="number"
        placeholder="HUF"
      />

      <select onChange={(e) => setValasztott(e.target.value)}>
        <option value="">Válassz egy opciót</option>
        <option value="elso">EUR</option>
        <option value="masodik">USD</option>
      </select>

      <button
        onClick={() => {
          switch (valasztott) {
            case "elso":
              setEredmeny(penz / 363.59);
              break;
            case "masodik":
              setEredmeny(penz / 316.69);
              break;
          }
        }}
      >
        Átváltás
      </button>

      <h2>
        {penz} - {eredmeny}
      </h2>
    </>
  );
}

export default Penzvalto;
