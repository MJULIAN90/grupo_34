import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>Counter App</h1>
      <div className="counter-display">
        <p>Current count: {count}</p>
      </div>
    </div>
  );
}

export default App;
