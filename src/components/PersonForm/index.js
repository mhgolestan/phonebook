const PersonForm = ({ handleSubmit, handleInput, newPerson }) => {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>
          <p>name:</p>
          <input name="name" value={newPerson.name} onChange={handleInput} />
        </label>
        <label>
          <p>number:</p>
          <input
            name="number"
            value={newPerson.number}
            onChange={handleInput}
          />
        </label>
      </fieldset>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
