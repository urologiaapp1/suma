import React, { useState } from "react";

export default function App() {
  const TOTAL = 30;

  const [view, setView] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [mode, setMode] = useState(10);

  // NUEVO
  const [selectedA, setSelectedA] = useState([]);
  const [selectedB, setSelectedB] = useState([]);

  const makeGame = (limit) => {
    let q = [];

    for (let i = 0; i < TOTAL; i++) {
      let a, b;

      do {
        a = Math.floor(Math.random() * (limit + 1));
        b = Math.floor(Math.random() * (limit + 1));
      } while (a + b > limit);

      const r = a + b;

      let opts = [r, Math.max(0, r - 1), r + 1].sort(
        () => Math.random() - 0.5
      );

      q.push({ a, b, r, opts });
    }

    setMode(limit);
    setQuestions(q);
    setIdx(0);
    setScore(0);
    setAnswer("");
    setFeedback(null);

    setSelectedA([]);
    setSelectedB([]);

    setView("game");
  };

  const q = questions[idx];

  const next = (ok) => {
    if (ok) {
      setScore((s) => s + 1);
    }

    setFeedback({
      correct: ok,
      correctAnswer: q.r,
    });
  };

  const continueGame = () => {
    // FIX FINAL
    if (idx >= TOTAL - 1) {
      setFeedback(null);
      setView("result");
      return;
    }

    setIdx((i) => i + 1);

    setAnswer("");

    setSelectedA([]);
    setSelectedB([]);

    setFeedback(null);
  };

  // HOME
  if (view === "home") {
    return (
      <div style={styles.home}>
        <h1 style={styles.logo}>➕ SUMA</h1>

        <p>Aprendamos jugando</p>

        <button
          style={styles.btn}
          onClick={() => makeGame(10)}
        >
          Sumas hasta 10
        </button>

        <button
          style={styles.btn}
          onClick={() => makeGame(20)}
        >
          Sumas hasta 20
        </button>
      </div>
    );
  }

  // FEEDBACK
  if (feedback) {
    return (
      <div style={styles.home}>
        <div
          style={{
            fontSize: 90,
            marginBottom: 20,
          }}
        >
          {feedback.correct ? "🎉" : "😢"}
        </div>

        <h1>
          {feedback.correct
            ? "¡Muy bien!"
            : "Te equivocaste"}
        </h1>

        <h2>
          La respuesta correcta era{" "}
          {feedback.correctAnswer}
        </h2>

        <button
          style={styles.btn}
          onClick={continueGame}
        >
          Siguiente →
        </button>
      </div>
    );
  }

  // RESULTADO
  if (view === "result") {
    const pct = Math.round((score / TOTAL) * 100);

    let msg = "¡Sigue practicando!";

    if (score >= 15) msg = "¡Buen trabajo!";
    if (score >= 25) msg = "¡Excelente!";
    if (score === 30)
      msg = "🏆 ¡Perfecto!";

    return (
      <div style={styles.home}>
        <div style={{ fontSize: 100 }}>
          🎉🎊🏆
        </div>

        <h1>{score} / 30</h1>

        <h2>{pct}%</h2>

        <h2>{msg}</h2>

        <button
          style={styles.btn}
          onClick={() => setView("home")}
        >
          Jugar nuevamente
        </button>
      </div>
    );
  }

  // GAME
  return (
    <div style={styles.game}>
      <h2>
        Pregunta {idx + 1} de {TOTAL}
      </h2>

      <div style={styles.bar}>
        <div
          style={{
            ...styles.fill,
            width: `${((idx + 1) / TOTAL) * 100}%`,
          }}
        />
      </div>

      <div style={styles.sum}>
        {q.a} + {q.b} = ?
      </div>

      {/* PRIMERAS 10 */}
      {idx < 10 ? (
        <>
          <div style={styles.row}>
            {Array(q.a)
              .fill(0)
              .map((_, i) => (
                <span key={i}>🔵</span>
              ))}
          </div>

          <div style={styles.row}>
            {Array(q.b)
              .fill(0)
              .map((_, i) => (
                <span key={i}>🟠</span>
              ))}
          </div>

          <div>
            {q.opts.map((o) => (
              <button
                key={o}
                style={styles.opt}
                onClick={() => next(o === q.r)}
              >
                {o}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* NUEVO SISTEMA */}
          <div style={styles.card}>
            <h3>
              🔵 Primer número ({q.a})
            </h3>

            <p>¡Márcalas tú!</p>

            <div style={styles.row}>
              {Array(
                mode === 20 ? 20 : 10
              )
                .fill(0)
                .map((_, i) => (
                  <span
                    key={i}
                    onClick={() => {
                      if (
                        selectedA.includes(i)
                      ) {
                        setSelectedA(
                          selectedA.filter(
                            (x) => x !== i
                          )
                        );
                      } else {
                        setSelectedA([
                          ...selectedA,
                          i,
                        ]);
                      }
                    }}
                    style={styles.ball}
                  >
                    {selectedA.includes(i)
                      ? "🔵"
                      : "⚪"}
                  </span>
                ))}
            </div>

            <h3>
              🟠 Segundo número ({q.b})
            </h3>

            <p>¡Márcalas tú!</p>

            <div style={styles.row}>
              {Array(
                mode === 20 ? 20 : 10
              )
                .fill(0)
                .map((_, i) => (
                  <span
                    key={i}
                    onClick={() => {
                      if (
                        selectedB.includes(i)
                      ) {
                        setSelectedB(
                          selectedB.filter(
                            (x) => x !== i
                          )
                        );
                      } else {
                        setSelectedB([
                          ...selectedB,
                          i,
                        ]);
                      }
                    }}
                    style={styles.ball}
                  >
                    {selectedB.includes(i)
                      ? "🟠"
                      : "⚪"}
                  </span>
                ))}
            </div>

            <input
              style={styles.input}
              type="number"
              value={answer}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
            />

            <br />

            <button
              style={styles.btn}
              onClick={() =>
                next(
                  Number(answer) === q.r
                )
              }
            >
              Responder
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  home: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#ff9a9e,#fad0c4,#fbc2eb)",
    padding: 20,
    textAlign: "center",
  },

  game: {
    minHeight: "100vh",
    padding: 20,
    textAlign: "center",
    background:
      "linear-gradient(135deg,#a8edea,#fed6e3)",
  },

  logo: {
    fontSize: 64,
    color: "#fff",
    marginBottom: 10,
  },

  btn: {
    fontSize: 24,
    padding: "16px 28px",
    margin: 10,
    borderRadius: 20,
    border: "none",
    cursor: "pointer",
    background: "#ffffff",
    fontWeight: "bold",
  },

  opt: {
    fontSize: 28,
    padding: "12px 24px",
    margin: 10,
    borderRadius: 16,
    border: "none",
    cursor: "pointer",
    background: "#fff",
  },

  sum: {
    fontSize: 60,
    fontWeight: "bold",
    margin: 30,
  },

  row: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },

  ball: {
    fontSize: 38,
    cursor: "pointer",
    userSelect: "none",
  },

  input: {
    fontSize: 36,
    width: 140,
    textAlign: "center",
    padding: 12,
    borderRadius: 16,
    border: "none",
    marginTop: 20,
  },

  bar: {
    height: 22,
    background: "#ddd",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },

  fill: {
    height: "100%",
    background: "#22c55e",
  },

  card: {
    background: "rgba(255,255,255,0.7)",
    padding: 20,
    borderRadius: 24,
    maxWidth: 700,
    margin: "0 auto",
  },
};
