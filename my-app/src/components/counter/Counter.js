import React, { useState } from "react";

const Counter = () => {
  // stale state
  const [count, setCount] = useState(0);
  const handleElements = () => {
    setTimeout(function delay() {
      setCount((count) => count + 1);
    }, 1000);
  };
  return <div onClick={handleElements}>Increment {count}</div>;
};

export default Counter;
