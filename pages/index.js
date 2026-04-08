import { useEffect, useState } from "react";

function makeObjects(level) {
  const count = Math.min(6 + level * 2, 18);

  return Array.from({ length: count }, (_, i) => ({
    id: `${level}-${i}-${Math.random()}`,
    x: Math.random() * 78 + 2,
    y: Math.random() * 58 + 18,
    hp: level >= 3 && Math.random() > 0.65 ? 2 : 1,
    kind: Math.random() > 0.85 ? "bomb" : "crate",
  }));
}

export default function Home() {
  const [screen, setScreen] = useState("start");
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [objects, setObjects] = useState([]);
  const [hits, setHits] = useState(0);
  const [flash, setFlash] = useState(false);

  const target = 6 + level * 2;

  useEffect(() => {
    if (screen !== "playing") return;

    if (timeLeft <= 0) {
      setScreen(hits >= target ? "win" : "lose");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [screen, timeLeft, hits, target]);

  function startLevel() {
    setObjects(makeObjects(level));
    setTimeLeft(20);
    setHits(0);
    setScreen("playing");
  }

  function triggerFlash() {
    setFlash(true);
    setTimeout(() => setFlash(false), 120);
  }

  function handleObjectTap(id) {
    if (screen !== "playing") return;

    let tappedObject = null;

    setObjects((prev) =>
      prev
        .map((obj) => {
          if (obj.id !== id) return obj;
          tappedObject = obj;

          if (obj.kind === "bomb") return obj;

          return { ...obj, hp: obj.hp - 1 };
        })
        .filter((obj) => {
          if (obj.id !== id) return true;
          if (obj.kind === "bomb") return true;
          return obj.hp - 1 > 0;
        })
    );

    if (!tappedObject) return;

    triggerFlash();

    if (tappedObject.kind === "bomb") {
      setScore((s) => Math.max(0, s - 15));
      return;
    }

    if (tappedObject.hp > 1) {
      setScore((s) => s + 5);
    } else {
      setScore((s) => s + 10);
      setHits((h) => h + 1);
    }
  }

  function nextLevel() {
    setLevel((l) => l + 1);
    setScreen("start");
  }

  function retryLevel() {
    setScreen("start");
  }

  function resetGame() {
    setLevel(1);
    setScore(0);
    setTimeLeft(20);
    setHits(0);
    setObjects([]);
    setScreen("start");
  }

  return (
    <main className={`app ${flash ? "flash" : ""}`}>
      <section className="card gameCard">
        <div className="topRow">
          <div className="badge">LEVEL {level}</div>
          <div className="badge altBadge">SCORE {score}</div>
        </div>

        <h1 className="title">TOTAL WRECK</h1>

        {screen === "start" && (
          <div className="panel">
            <p className="subtitle">
              Smash targets before time runs out.
            </p>
            <div className="statsBox">
              <div>Time: 20 sec</div>
              <div>Target: {target} wrecks</div>
            </div>
            <button className="primaryBtn" onClick={startLevel}>
              START LEVEL
            </button>
          </div>
        )}

        {screen === "playing" && (
          <div className="panel">
            <div className="hudRow">
              <span>Time: {timeLeft}</span>
              <span>
                Wrecked: {hits}/{target}
              </span>
            </div>

            <div className="arena">
              {objects.map((obj) => (
                <button
                  key={obj.id}
                  className={`target ${obj.kind === "bomb" ? "bomb" : "crate"} ${
                    obj.hp === 2 ? "tough" : ""
                  }`}
                  style={{
                    left: `${obj.x}%`,
                    top: `${obj.y}%`,
                  }}
                  onClick={() => handleObjectTap(obj.id)}
                >
                  {obj.kind === "bomb" ? "💣" : obj.hp === 2 ? "📦" : "🧱"}
                </button>
              ))}
            </div>

            <p className="hint">
              Tap crates to wreck them. Avoid bombs.
            </p>
          </div>
        )}

        {screen === "win" && (
          <div className="panel">
            <p className="label">LEVEL CLEARED</p>
            <div className="rewardBox">+ LEVEL UP</div>
            <p className="subtitle">
              You hit the target and survived the chaos.
            </p>
            <button className="primaryBtn" onClick={nextLevel}>
              NEXT LEVEL
            </button>
          </div>
        )}

        {screen === "lose" && (
          <div className="panel">
            <p className="label">TIME UP</p>
            <div className="challengeBox">
              You wrecked {hits} / {target}
            </div>
            <p className="subtitle">
              Try again and hit the target before the clock runs out.
            </p>
            <div className="buttonStack">
              <button className="primaryBtn" onClick={retryLevel}>
                RETRY LEVEL
              </button>
              <button className="secondaryBtn" onClick={resetGame}>
                RESET GAME
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
