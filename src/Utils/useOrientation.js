import { useState, useEffect } from "react";

export default function useOrientation() {
  const [orientation, setOrientation] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(orientation: portrait)").matches
        ? "portrait"
        : "landscape"
      : "portrait"
  );

  useEffect(() => {
    const portraitQuery = window.matchMedia("(orientation: portrait)");

    const updateOrientation = (e) => {
      setOrientation(e.matches ? "portrait" : "landscape");
    };

    portraitQuery.addEventListener("change", updateOrientation);

    return () => {
      portraitQuery.removeEventListener("change", updateOrientation);
    };
  }, []);

  return orientation;
}