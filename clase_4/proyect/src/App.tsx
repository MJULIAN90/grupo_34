import { useState } from "react";
import CounterControls from "./CounterControls";
import CounterStatus from "./CounterStatus";
import "./App.css";

// - Agregar un tercer botón en CounterControls que resetea el contador a 0. Esto requiere:
// - Agregar onReset: () => void a la interface de props
// - Agregar el botón en el JSX
// - Implementar handleReset en App que hace setCount(0)
// - Pasar handleReset como prop onReset

// se crean una vez porque esta fuera de la function
const MIN_COUNT = -5;
const MAX_COUNT = 5;

function App() {
  // no va dentro del componente porque se van a crear
  // en cada renderizado de APp
  // hook ref
  // const MIN_COUNT = -5;
  // const MAX_COUNT = 5;

  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    // consultar diferencias
    // setCount((prev) => prev +1)
    // setCount(prev +1)

    setCount((prevCount) => {
      if (prevCount < MAX_COUNT) {
        return prevCount + 1;
      }
      return prevCount;
    });
  };

  const handleDecrement = () => {
    setCount((prevCount) => {
      if (prevCount > MIN_COUNT) {
        return prevCount - 1;
      }
      return prevCount;
    });
  };

  return (
    <div className="app">
      <h1>Counter App</h1>
      <div className="counter-display">
        <p>Current count: {count}</p>
      </div>
      <CounterControls
        count={count}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        min={MIN_COUNT}
        max={MAX_COUNT}
      />
      <CounterStatus count={count} />
    </div>
  );
}

export default App;
