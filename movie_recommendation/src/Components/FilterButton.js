import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

function FilterButton({ id, name, onClick }) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      onClick((arr) => [...arr, id]);
    } else {
      onClick((arr) => [...arr].filter((el) => el !== id));
    }
  }, [id, onClick, isSelected]);

  return (
    <button
      key={id}
      onClick={() => setIsSelected(!isSelected)}
      style={{
        minWidth: 64,
        background: isSelected ? "grey" : "white",
        borderRadius: 10,
        margin: 0.5,
        borderColor: "black",
        padding: 5,
      }}
    >
      <Typography>{name}</Typography>
    </button>
  );
}

export default FilterButton;
