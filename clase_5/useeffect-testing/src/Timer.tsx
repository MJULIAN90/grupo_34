import { useState, useEffect } from "react";

export function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
      console.log("tick");
    }, 1000);

    return () => {
      clearInterval(id);
      console.log("cleanup — intervalo limpiado");
    };
  }, []);

  useEffect(() => {
    const handler = () => console.log("resize:", window.innerWidth);
    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, []);

  return <p>Segundos: {seconds}</p>;
}
