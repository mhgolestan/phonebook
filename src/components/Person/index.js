const Person = ({ name, number, handleEditInfo, handleDeletePerson }) => {
  return (
    <li>
      {name}
      {number}
      <button onClick={handleEditInfo}>Edit</button>
      <button onClick={handleDeletePerson}>Remove</button>
    </li>
  );
};

export default Person;
