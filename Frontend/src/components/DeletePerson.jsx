import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DeletePerson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/person/api/${id}`)
      .then((res) => res.json())
      .then(setPerson);
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/person/${id}?_method=DELETE`, {
      method: "POST",
    });
    navigate("/");
  };

  if (!person) return <p>Loading...</p>;

  return (
    <div>
      <h2>Delete {person.name}?</h2>
      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}
