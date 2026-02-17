import Counter from "./Counter";
import { useState } from "react";
function App() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Skill Tracker Counter 🚀</h1>
      <h2>{count}</h2>

      <Counter title="My First React Props Example 🔥" />
      <button onClick={increase}>Increase</button>
      <button onClick={decrease} style={{ marginLeft: "10px" }}>
        Decrease
      </button>
    </div>
  );
}

export default App;