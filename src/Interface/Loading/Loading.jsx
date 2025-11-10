import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const Loader = () => {
  const { progress } = useProgress();
  const [visible, setVisible] = useState(true);

  // Fade-out transition when loading finishes
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setVisible(false), 400);
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "8px",
          color: "white",
          fontFamily: "sans-serif",
          transition: "opacity 0.4s ease",
          opacity: progress === 100 ? 0 : 1,
          pointerEvents: "none",
        }}
      >
        {/* Progress bar background */}
        <div
          style={{
            width: "150px",
            height: "6px",
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {/* Fill */}
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg,#ff005e,#ffae00)",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>

        {/* Percentage text */}
        <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
          {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
};

export default Loader;
