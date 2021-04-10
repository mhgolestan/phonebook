const Filter = ({ searchedPersons, handleSearchInput }) => {
  return (
    <input
      type="text"
      placeholder="Search"
      value={searchedPersons}
      onChange={handleSearchInput}
    />
  );
};

export default Filter;
