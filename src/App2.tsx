import styled, { keyframes } from "styled-components";
import Circle from "./Circle";

function App() {
  return (
    <div>
      <Circle bgColor="tomato" text="라라" />
      <Circle bgColor="teal" borderColor="blue" text="치치" />
    </div>
  );
}

export default App;
