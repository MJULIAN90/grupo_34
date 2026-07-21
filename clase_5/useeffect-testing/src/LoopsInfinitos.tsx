import { useState, useEffect } from "react";

export function InfiniteLoop() {
  const [data, setData] = useState("");

  useEffect(() => {
    setData(data + "x");
    console.log("hola");
  }, [data]);

  return <p>{data}</p>;
}
