import "./App.css";
import Navbar from "./components/Navbar";
import CustomeTable from "./components/Table";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ padding: "20px" }}>
        <CustomeTable />
      </div>
    </div>
  );
}

export default App;
