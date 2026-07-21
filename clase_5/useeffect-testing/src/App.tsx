import { useState } from "react";
import { Timer } from "./Timer";
import { PersistentInput } from "./Persistencia";
import { InfiniteLoop } from "./LoopsInfinitos";

function App() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow((s) => !s)}>
        {show ? "Desmontar" : "Montar"}
      </button>
      {show && <Timer />}
      <PersistentInput />
      {/* <InfiniteLoop /> */}
    </div>
  );
}

export default App;
