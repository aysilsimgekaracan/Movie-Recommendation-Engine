function CustomButton({ title, onClick }) {
  return (
    <button
      style={{
        textAlign: "left",
        marginRight: 10,
        backgroundColor: "transparent",
        borderRadius: 10,
        borderWidth: 1,
        color: "white",
        fontSize: 16,
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default CustomButton;
