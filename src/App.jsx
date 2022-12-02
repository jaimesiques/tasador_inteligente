import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import FormBox from "./components/form/FormBox";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FormBox />
    </>
  );
}

export default App;
