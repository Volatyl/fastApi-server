import { useContext } from "react";
import AddPerson from "./components/addPerson";
import Edit from "./components/editPerson";
import { PersonContext } from "./components/context";

interface Person {
  id: number;
  name: string;
  occupation: string;
}

function App() {
  const { state, dispatch } = useContext(PersonContext);

  const data = state.data;

  function handleDelete(person: Person) {
    fetch(`http://127.0.0.1:8000/people/${person.id}`, {
      method: "DELETE",
    }).then(() => window.location.reload());
  }

  function handleEdit(person: any) {
    dispatch({ type: "EDIT", payload: person });
    dispatch({ type: "SHOW-EDIT", payload: true });
  }
  console.log(state.show);
  const edit = state.show ? <Edit /> : null;
  const add = !state.show ? <AddPerson /> : null;

  return (
    <>
      <h1>FRIENDS OF VOLATYL</h1>

      <div className="main-bar">
        <p>NAME</p>
        <p>OCCUPATION</p>
      </div>

      {data.map((person: any) => (
        <div id="map" key={person.id}>
          <p className="map-p">{person.name}</p>
          <p className="map-p">{person.occupation}</p>
          <button onClick={() => handleEdit(person)}>EDIT</button>
          <button onClick={() => handleDelete(person)}>DELETE</button>
        </div>
      ))}
      {add}
      {edit}
    </>
  );
}

export default App;
