import React from "react";
import { Box, Typography } from "@mui/material";

type GameResultDisplayProps = {
  result: number | null;
};

const GameResultDisplay: React.FC<GameResultDisplayProps> = ({ result }) => {
  return (
    <Box textAlign="center" mb={{ xs: 2, sm: 3 }} mt={{ xs: 1, sm: 2 }}>
      <Typography
        variant="h2"
        color="#111"
        fontWeight={700}
        sx={{
          fontSize: { xs: "2.5rem", sm: "3.75rem", md: "4rem" },
          lineHeight: { xs: 1.2, sm: 1.1 },
        }}
      >
        {result ? result : "-"}
      </Typography>
    </Box>
  );
};

export default GameResultDisplay;
