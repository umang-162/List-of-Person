import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PersonList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/person")
      .then((res) => res.text()) // backend sends HTML
      .then((data) => {
        const doc = new DOMParser().parseFromString(data, "text/html");
        const rows = [...doc.querySelectorAll("tr")].slice(1);
        const peopleData = rows.map((row) => {
          const cells = row.querySelectorAll("td");
          return {
            name: cells[0].textContent,
            age: cells[1].textContent,
            gender: cells[2].textContent,
            mobile: cells[3].textContent,
            id: cells[4].querySelector("a").href.split("/")[4],
          };
        });
        setPeople(peopleData);
      });
  }, []);

  return (
    <div>
      <h1>Person List</h1>
      <Link to="/add">+ Add Person</Link>
      {people.length === 0 ? (
        <p>No people found or loading...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.mobile}</td>
                <td>
                  <Link to={`/edit/${p.id}`}>Edit</Link> |{" "}
                  <Link to={`/delete/${p.id}`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PersonList;
