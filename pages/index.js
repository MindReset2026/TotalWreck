import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <main className="app">
      <section className="card">
        <div className="badge">LEVEL 1</div>
        <h1 className="title">TOTAL WRECK</h1>
        <p className="xp">XP: 0</p>

        {!started && !done && (
          <div className="panel">
            <p className="subtitle">Break stuff. Beat levels. Go bigger.</p>
            <button className="primaryBtn" onClick={() => setStarted(true)}>
              START WRECKING
            </button>
          </div>
        )}

        {started && !done && (
          <div className="panel">
            <p className="label">YOUR CHALLENGE</p>
            <div className="challengeBox">Knock over 5 objects</div>
            <p className="hint">Use safe objects only.</p>
            <button className="primaryBtn" onClick={() => setDone(true)}>
              DONE
            </button>
          </div>
        )}

        {done && (
          <div className="panel">
            <p className="label">LEVEL CLEARED</p>
            <div className="rewardBox">+100 XP</div>
            <p className="subtitle">Nice. You unlocked the next wreck.</p>
            <button
              className="primaryBtn"
              onClick={() => {
                setStarted(false);
                setDone(false);
              }}
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
