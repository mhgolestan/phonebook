import Services from "./services/persons";

import React, { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchedPersons, setSearchedPersons] = useState("");
  const [notificationMessage, setNotificationMeessage] = useState(null);

  useEffect(() => {
    Services.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!persons.some((person) => person.name === newPerson.name)) {
      Services.create(newPerson).then((returnedPerson) =>
        setPersons(persons.concat(returnedPerson))
      );
      setNewPerson({ name: "", number: "" });
      setNotificationMeessage(`${newPerson.name} is added`);
      setTimeout(() => {
        setNotificationMeessage(null);
      }, 3000);
    } else {
      const replaceConfirmation = window.confirm(
        `${newPerson.name} is already added to phonebook. Do you want to replace it?`
      );
      if (replaceConfirmation) {
        const personId = persons.find(
          (person) => person.name === newPerson.name
        ).id;
        Services.edit(personId, newPerson).then((returnedPerson) =>
          setPersons(
            persons.map((person) =>
              person.id !== personId ? person : returnedPerson
            )
          )
        );
      }
      setNewPerson({ name: "", number: "" });
      setNotificationMeessage(`${newPerson.name} is edited`);
      setTimeout(() => {
        setNotificationMeessage(null);
      }, 3000);
    }
  };

  const handleInput = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleSearchInput = (event) => {
    setSearchedPersons(event.target.value);
  };

  const personsToShow =
    searchedPersons.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLocaleLowerCase().includes(searchedPersons)
        );

  const handleEditInfoOf = (id) => {
    const name = prompt(
      "Please enter new name:",
      persons.find((person) => person.id === id).name
    );
    const number = prompt(
      "Please enter new number:",
      persons.find((person) => person.id === id).number
    );
    const changedPerson = { name: name, number: number };
    Services.edit(id, changedPerson)
      .then((returnedPerson) =>
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        )
      )
      .catch((error) => {
        console.log(error);
        setNotificationMeessage(
          `${changedPerson.name} has already been deleted`
        );
        setTimeout(() => {
          setNotificationMeessage(null);
        }, 3000);
      });
  };

  const handleDeletePersonOf = (id) => {
    Services.remove(id);
    const remainedPersons = persons.filter((person) => person.id !== id);
    setPersons(remainedPersons);
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <Filter
        searchedPersons={searchedPersons}
        handleSearchInput={handleSearchInput}
      />
      <PersonForm
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            handleEditInfo={() => handleEditInfoOf(person.id)}
            handleDeletePerson={() => handleDeletePersonOf(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
