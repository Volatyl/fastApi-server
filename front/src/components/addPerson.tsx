import { useState } from "react";

function AddPerson() {
  const [person, setPerson] = useState({ name: "", occupation: "" });

  function handleSubmit() {
    fetch("http://127.0.0.1:8000/people/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).catch((error) => {
      console.error(error);
    });
  }

  function handleChange(e: any) {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  }

  console.log(person);

  return (
    <>
      <form id="form">
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="occupation"
          name="occupation"
          onChange={handleChange}
        />
        <input type="submit" value="ADD PERSON" onClick={handleSubmit} />
      </form>
    </>
  );
}

export default AddPerson;
