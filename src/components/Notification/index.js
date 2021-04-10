const Notification = ({ message }) => {
  const messageStyle = {
    color: "green",
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const errorMessageStyle = {
    color: "red",
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  // Edit and add "false", error is "true"
  const messageTypeError = message !== null && message.includes("deleted");

  if (message === null) {
    return null;
  }
  return (
    <div style={messageTypeError ? errorMessageStyle : messageStyle}>
      {message}
    </div>
  );
};

export default Notification;
