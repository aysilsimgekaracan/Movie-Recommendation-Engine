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
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    color: "white",
    fontSize: 16,
  },
};

export default CustomButton;
