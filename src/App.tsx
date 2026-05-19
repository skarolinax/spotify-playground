import { useState } from "react";
import "./styles/main.scss";

function App() {

  const [song, setSong] = useState("");

  return (
    <>

    <main>
      <div id="ipod">
        <div id="ipod-screen"></div>
        <div id="ipod-controls"></div>
      </div>
    </main>
     
    </>
  )
}

export default App
