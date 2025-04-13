import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditPerson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/person/api/${id}`)
      .then((res) => res.json())
      .then(setPerson);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/person/${id}?_method=PUT`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(person),
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Person</h2>
      <input name="name" value={person.name} onChange={handleChange} required />
      <input name="age" value={person.age} onChange={handleChange} required />
      <input
        name="gender"
        value={person.gender}
        onChange={handleChange}
        required
      />
      <input
        name="mobile"
        value={person.mobile}
        onChange={handleChange}
        required
      />
      <button type="submit">Update</button>
    </form>
  );
}
