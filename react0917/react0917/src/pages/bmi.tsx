import { useState } from "react";

const bmi = () => {
  const [suly, setSuly] = useState<number>();
  const [mag, setMag] = useState<number>();
  const [eredmeny, setEredmeny] = useState<string>("");

  const bmiszam = suly / Math.pow(mag/100, 2);

  return (
    <>
      <input
        type="number"
        placeholder="adja meg a magassagat"
        onChange={(e) => setMag(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="adja meg a sulyat"
        onChange={(e) => setSuly(Number(e.target.value))}
      />

      <button
        onClick={() => {
          console.log(bmiszam);
          if (bmiszam >= 0 && bmiszam <= 15.9) {
            setEredmeny("sulyos sovanysag");
          } else if (bmiszam >= 16 && bmiszam <= 16.9) {
            setEredmeny("mersekelt sovanysag");
          } else if (bmiszam >= 17 && bmiszam <= 18.4) {
            setEredmeny("enyhe sovanysag");
          } else if (bmiszam >= 18.5 && bmiszam <= 24.9) {
            setEredmeny("normal testsuly");
          } else if (bmiszam >= 25 && bmiszam <= 29.9) {
            setEredmeny("tulsulyos");
          } else if (bmiszam >= 30 && bmiszam <= 34.9) {
            setEredmeny("elhizott (I. fok)");
          } else if (bmiszam >= 35 && bmiszam <= 39.9) {
            setEredmeny("elhizott (II. fok)");
          } else if (bmiszam > 40) {
            setEredmeny("sulyosan elhizott (III. foku)");
          }
        }}
      >
        szamitas
      </button>

      <h2>Az állapotod: {eredmeny}</h2>
    </>
  );
};

export default bmi;
