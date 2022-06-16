function CustomButton({ title, onClick }) {
  return (
    <button style={styles.button} onClick={onClick}>
      {title}
    </button>
  );
}

let styles = {
  button: {
    textAlign: "left",
    marginRight: 10,
    borderWidth: 1,
    color: "white",
    fontSize: 15,
    cursor: "pointer",
    backgroundColor: "#212224",
    borderRadius: 1,
    borderColor: "#212224",
  },
};

export default CustomButton;
