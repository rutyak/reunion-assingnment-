import "./App.css";
import Navbar from "./components/Navbar";
import CustomTable from "./components/CustomTable";
import { useState } from "react";

function App() {

  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <Navbar setSearch={setSearch} search={search}/>
      <CustomTable search={search}/>
    </div>
  );
}

export default App;
