import React from "react";
import { Snackbar, Alert } from "@mui/material";

type GameToastProps = {
  open: boolean;
  win: boolean | null;
  message: string;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  key: number;
};

const GameToast: React.FC<GameToastProps> = ({
  open,
  win,
  message,
  onClose,
  key,
}) => {
  return (
    <Snackbar
      key={key}
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={win ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GameToast;
