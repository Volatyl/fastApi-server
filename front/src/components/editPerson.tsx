import { useContext, useState } from "react";
import { PersonContext } from "./context";

function Edit() {
  const { state, dispatch } = useContext(PersonContext);
  const [person, setPerson] = useState(state.person);

  const id = state.person.id;

  function handleSubmit() {
    fetch(`http://127.0.0.1:8000/people/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).catch((error) => {
      console.error(error);
    });

    dispatch({ type: "SHOW-ITEM", payload: false });
  }

  function handleChange(e: any) {
    const { name, value } = e.target;

    setPerson((prevPerson: any) => ({
      ...prevPerson,
      [name]: value === "" ? state.person[name] : value,
    }));
  }

  console.log(person);
  return (
    <div className="edit">
      <h3>EDIT PERSON</h3>
      <form id="form">
        <input
          type="text"
          placeholder={state.person.name}
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder={state.person.occupation}
          name="occupation"
          onChange={handleChange}
        />
        <input type="submit" value="EDIT PERSON" onClick={handleSubmit} />
      </form>
    </div>
  );
}
export default Edit;
