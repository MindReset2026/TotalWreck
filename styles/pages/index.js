import { useEffect, useMemo, useState } from "react";

const CHALLENGES = [
  "Knock over 5 objects",
  "Build a tower and smash it",
  "Crumple 10 pieces of paper",
  "Stack cups and wreck them",
  "Make a cardboard wall and break through it"
];

export default function Home() {
  const [screen, setScreen] = useState("title");
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(20);

  const currentChallenge = useMemo(() => {
    return CHALLENGES[(level - 1) % CHALLENGES.length];
  }, [level]);

  useEffect(() => {
    if (screen !== "playing" || secondsLeft <= 0) return;

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [screen, secondsLeft]);

  useEffect(() => {
    if (screen === "playing" && secondsLeft <= 0) {
      setScreen("done");
      setXp((prev) => prev + 100);
    }
  }, [screen, secondsLeft]);

  function startChallenge() {
    setSecondsLeft(20);
    setScreen("playing");
  }

  function finishChallengeEarly() {
    setScreen("done");
    setXp((prev) => prev + 100);
  }

  function nextLevel() {
    setLevel((prev) => prev + 1);
    setScreen("challenge");
  }

  function beginGame() {
    setScreen("challenge");
  }

  function restartGame() {
    setLevel(1);
    setXp(0);
    setSecondsLeft(20);
    setScreen("title");
  }

  return (
    <main className="app">
      <div className="bgGlow glow1" />
      <div className="bgGlow glow2" />

      <section className="card">
        <div className="badge">LEVEL {level}</div>
        <h1 className="title">TOTAL WRECK</h1>
        <p className="xp">XP: {xp}</p>

        {screen === "title" && (
          <div className="panel">
            <p className="subtitle">Break stuff. Beat levels. Go bigger.</p>
            <button className="primaryBtn" onClick={beginGame}>
              START WRECKING
            </button>
          </div>
        )}

        {screen === "challenge" && (
          <div className="panel">
            <p className="label">YOUR CHALLENGE</p>
            <div className="challengeBox">{currentChallenge}</div>
            <p className="hint">
              Use safe objects only. Ask a grown-up first if needed.
            </p>
            <button className="primaryBtn" onClick={startChallenge}>
              START TIMER
            </button>
          </div>
        )}

        {screen === "playing" && (
          <div className="panel">
            <p className="label">WRECK IN PROGRESS</p>
            <div className="timer">{secondsLeft}</div>
            <p className="challengeText">{currentChallenge}</p>
            <button className="primaryBtn" onClick={finishChallengeEarly}>
              DONE
            </button>
          </div>
        )}

        {screen === "done" && (
          <div className="panel">
            <p className="label">LEVEL CLEARED</p>
            <div className="rewardBox">+100 XP</div>
            <p className="subtitle">Nice. You unlocked the next wreck.</p>

            <div className="buttonRow">
              <button className="primaryBtn" onClick={nextLevel}>
                NEXT LEVEL
              </button>
              <button className="secondaryBtn" onClick={restartGame}>
                RESTART
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
