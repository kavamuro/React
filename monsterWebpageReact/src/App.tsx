import { useState } from "react";
import "./App.css";

// ---- Settings ----
const MAX_HEALTH = 100;
const PLAYER_ATTACK = 12;
const SPECIAL_MIN = 15;
const SPECIAL_MAX = 50;
const HEAL_MIN = 15;
const HEAL_MAX = 30;
const MONSTER_MIN = 8;
const MONSTER_MAX = 35;

// ---- Types ----
type Actor = "Player" | "Monster";
type Action = "attack" | "special" | "heal";
type Result = "win" | "lose" | "draw" | "surrender" | null;

interface LogEntry {
  id: number;
  actor: Actor;
  action: Action;
  amount: number;
}

// ---- Helpers ----
const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getResult = (monster: number, player: number): Result => {
  if (monster <= 0 && player <= 0) return "draw";
  if (monster <= 0) return "win";
  if (player <= 0) return "lose";
  return null;
};

const resultMessages: Record<Exclude<Result, null>, string> = {
  win: "You won! The monster is defeated!",
  lose: "You lost! The monster got you.",
  draw: "It's a draw!",
  surrender: "You surrendered! You lost.",
};

let nextLogId = 0;

// ---- Components ----
const HealthBar = ({ title, health }: { title: string; health: number }) => {
  const value = Math.max(health, 0);
  let color = "#00a876";
  if (value <= 25) color = "#d10000";
  else if (value <= 50) color = "#e0a100";

  return (
    <section className="container">
      <h2>{title}</h2>
      <p className="health-value">{value}</p>
      <div className="healthbar">
        <div
          className="healthbar__value"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </section>
  );
};

const LogItem = ({ entry }: { entry: LogEntry }) => {
  const actorClass = entry.actor === "Player" ? "log--player" : "log--monster";
  const amountClass = entry.action === "heal" ? "log--heal" : "log--damage";
  const amount = <span className={amountClass}>{entry.amount}</span>;

  return (
    <li>
      <span className={actorClass}>{entry.actor}</span>
      {entry.action === "heal" && <> heals himself for {amount} HP</>}
      {entry.action === "special" && (
        <> uses a special attack and deals {amount} damage</>
      )}
      {entry.action === "attack" && <> attacks and deals {amount} damage</>}
    </li>
  );
};

const App = () => {
  const [monsterHealth, setMonsterHealth] = useState(MAX_HEALTH);
  const [playerHealth, setPlayerHealth] = useState(MAX_HEALTH);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [result, setResult] = useState<Result>(null);

  const makeLog = (actor: Actor, action: Action, amount: number): LogEntry => {
    return { id: nextLogId++, actor, action, amount };
  };

  // Applies the player's move, then the monster strikes back if it's still alive
  const playTurn = (
    newMonster: number,
    newPlayer: number,
    playerLog: LogEntry,
  ) => {
    const newLogs = [playerLog];

    if (newMonster > 0) {
      const damage = randomBetween(MONSTER_MIN, MONSTER_MAX);
      newPlayer -= damage;
      newLogs.unshift(makeLog("Monster", "attack", damage));
    }

    setMonsterHealth(newMonster);
    setPlayerHealth(newPlayer);
    setLogs((prev) => [...newLogs, ...prev]); // newest on top
    setResult(getResult(newMonster, newPlayer));
  };

  const attack = () => {
    playTurn(
      monsterHealth - PLAYER_ATTACK,
      playerHealth,
      makeLog("Player", "attack", PLAYER_ATTACK),
    );
  };

  const specialAttack = () => {
    const damage = randomBetween(SPECIAL_MIN, SPECIAL_MAX);
    playTurn(
      monsterHealth - damage,
      playerHealth,
      makeLog("Player", "special", damage),
    );
  };

  const heal = () => {
    const amount = randomBetween(HEAL_MIN, HEAL_MAX);
    const healed = Math.min(amount, MAX_HEALTH - playerHealth); // can't go above 100
    playTurn(
      monsterHealth,
      playerHealth + healed,
      makeLog("Player", "heal", healed),
    );
  };

  const surrender = () => {
    setPlayerHealth(0);
    setResult("surrender");
  };

  const newGame = () => {
    setMonsterHealth(MAX_HEALTH);
    setPlayerHealth(MAX_HEALTH);
    setLogs([]);
    setResult(null);
  };

  return (
    <>
      <header>
        <h1>Monster Slayer</h1>
      </header>

      <main>
        <HealthBar title="Monster Health" health={monsterHealth} />
        <HealthBar title="Your Health" health={playerHealth} />

        {result ? (
          <section className="container" id="game-over">
            <h2>Game Over!</h2>
            <h3>{resultMessages[result]}</h3>
            <button onClick={newGame}>Start New Game</button>
          </section>
        ) : (
          <section id="controls">
            <button onClick={attack}>Attack</button>
            <button onClick={specialAttack}>Special Attack</button>
            <button onClick={heal}>Heal</button>
            <button onClick={surrender}>Surrender</button>
          </section>
        )}

        <section className="container" id="log">
          <h2>Battle Log</h2>
          <ul>
            {result && (
              <li className="log--result">{resultMessages[result]}</li>
            )}
            {logs.map((entry) => (
              <LogItem key={entry.id} entry={entry} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default App;
