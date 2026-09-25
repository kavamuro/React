import "./App.css";
import type { Lol } from "./types/Lol";

function App() {
  const champek: Array<Lol> = [
    { name: "Ahri", lane: "mid", kda: 2 },
    { name: "Yasuo", lane: "mid/top", kda: 3 },
  ];

  return (
    <>
      <h1>Champek</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>Lane</th>
          <th>KD/A</th>
        </thead>
        <tbody>
          {champek.map((i: Lol) => (
            <tr>
              <td>{i.name}</td>
              <td>{i.lane}</td>
              <td>{i.kda}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
