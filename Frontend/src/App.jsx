import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonList from "./components/PersonList";
import AddPerson from "./components/AddPerson";
import EditPerson from "./components/EditPerson";
import DeletePerson from "./components/DeletePerson";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonList />} />
        <Route path="/add" element={<AddPerson />} />
        <Route path="/edit/:id" element={<EditPerson />} />
        <Route path="/delete/:id" element={<DeletePerson />} />
      </Routes>
    </Router>
  );
}

export default App;
