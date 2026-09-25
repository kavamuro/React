import { useState } from "react";

function Szamologep() {
  const [elso, setElso] = useState<number>();
  const [masodik, setMasodik] = useState<number>();
  const [eredmeny, setEredmeny] = useState<number>();
  const [valasztott, setValasztott] = useState<string>("osszeadas");

  return (
    <>
      <h1>szamologep</h1>

      <input
        type="number"
        placeholder="0"
        onChange={(e) => setElso(Number(e.target.value))}
      />

      <select onChange={(e) => setValasztott(e.target.value)}>
        <option value="osszeadas">+</option>
        <option value="kivonas">-</option>
        <option value="szorzas">*</option>
        <option value="osztas">/</option>
      </select>

      <input
        type="number"
        placeholder="0"
        onChange={(e) => setMasodik(Number(e.target.value))}
      />

      <button
        onClick={() => {
          switch (valasztott) {
            case "osszeadas":
              setEredmeny(elso + masodik);
              break;
            case "kivonas":
              setEredmeny(elso - masodik);
              break;
            case "szorzas":
              setEredmeny(elso * masodik);
              break;
            case "osztas":
              setEredmeny(elso / masodik);
              break;
          }
        }}
      >
        szamolas
      </button>

      <h2>eredmény: {eredmeny}</h2>
    </>
  );
}

export default Szamologep;
