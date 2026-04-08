import { useState } from "react";

const challenges = [
  "Knock over 5 objects",
  "Build a tower and destroy it",
  "Crash something soft",
  "Make the loudest (safe) noise",
  "Stack 3 things then wreck them",
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [challenge, setChallenge] = useState("");

  const startGame = () => {
    const random = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(random);
    setStarted(true);
    setDone(false);
  };

  const completeChallenge = () => {
    setDone(true);
    setXp(xp + 100);
  };

  const nextLevel = () => {
    setLevel(level + 1);
    setStarted(false);
    setDone(false);
  };

  return (
    <main className="app">
      <section className="card">
        <div className="badge">LEVEL {level}</div>
        <h1 className="title">TOTAL WRECK</h1>
        <p className="xp">XP: {xp}</p>

        {!started && !done && (
          <div className="panel">
            <p className="subtitle">Break stuff. Beat levels. Go bigger.</p>
            <button className="primaryBtn" onClick={startGame}>
              START WRECKING
            </button>
          </div>
        )}

        {started && !done && (
          <div className="panel">
            <p className="label">YOUR CHALLENGE</p>
            <div className="challengeBox">{challenge}</div>
            <p className="hint">Use safe objects only.</p>
            <button className="primaryBtn" onClick={completeChallenge}>
              DONE
            </button>
          </div>
        )}

        {done && (
          <div className="panel">
            <p className="label">LEVEL CLEARED</p>
            <div className="rewardBox">+100 XP</div>
            <p className="subtitle">Next level unlocked.</p>
            <button className="primaryBtn" onClick={nextLevel}>
              NEXT LEVEL
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
