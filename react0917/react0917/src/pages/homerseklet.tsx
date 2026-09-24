import { useState } from "react";

const homerseklet = () => {
  const [celsius, setCelsius] = useState<number>(0);
  const [eredmeny, setEredmeny] = useState<string>("");

  const fahr = celsius + 273.15;
  const kelv = celsius * 1.8 + 32;
  return (
    <>
      <h1>hőmérséklet átváltó</h1>
      <h2>adja meg celsiusban a homersekletet</h2>
      <input
        type="number"
        placeholder="0"
        onChange={(e) => {
          setCelsius(Number(e.target.value));
        }}
      />

      <button
        onClick={() =>
          setEredmeny(`${celsius} °C = ${fahr}°F \n ${celsius} °C = ${kelv}K`)
        }
      >
        számítás
      </button>
        
      <h2>{eredmeny}</h2>
    </>
  );
};

export default homerseklet;
