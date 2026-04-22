import React, { useEffect, useRef, useState } from "react";

const TABLEAU_SCRIPT_ID = "tableau-embedding-api";
const TABLEAU_SCRIPT_SRC =
  "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
const TABLEAU_VIZ_SRC =
  "https://public.tableau.com/views/AGuidetothe2026SummerLasVegasPokerScene_app/2026SummerPoker?:showVizHome=no";

function useTableauScript() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existing = document.getElementById(TABLEAU_SCRIPT_ID) as HTMLScriptElement | null;

    if (existing) {
      setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = TABLEAU_SCRIPT_ID;
    script.type = "module";
    script.src = TABLEAU_SCRIPT_SRC;
    script.onload = () => setReady(true);
    script.onerror = () => setError("Failed to load Tableau embedding library.");
    document.head.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  return { ready, error };
}

export default function App() {
  const { ready, error } = useTableauScript();
  const vizRef = useRef<HTMLElement | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#ffffff",
        color: "#111",
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        {!ready && !error && (
          <div style={{ padding: 40, textAlign: "center", color: "#666" }}>
            Loading Tableau embed...
          </div>
        )}

        {error && (
          <div style={{ padding: 40, textAlign: "center", color: "red" }}>
            {error}
          </div>
        )}

        {ready &&
          !error &&
          React.createElement("tableau-viz", {
            ref: (node: HTMLElement | null) => {
              vizRef.current = node;
            },
            id: "summer-poker-viz",
            src: TABLEAU_VIZ_SRC,
            toolbar: "hidden",
            "hide-tabs": "true",
            style: {
              width: "100%",
              height: "100%",
              display: "block",
            },
          })}
      </div>
    </div>
  );
}