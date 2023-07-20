import React from "react";
import { CircularProgress } from "@material-ui/core";

export const Animacija = () => {
  return (
    // Ako su podaci još uvek učitavaju, prikaži animaciju
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};
