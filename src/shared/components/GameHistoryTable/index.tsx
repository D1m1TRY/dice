import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { GameCondition } from "@/shared/constants";
import { GameResult } from "@/shared/types";

type GameHistoryTableProps = {
  history: GameResult[];
};

const GameHistoryTable: React.FC<GameHistoryTableProps> = ({ history }) => {
  return (
    <TableContainer sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
              Time
            </TableCell>
            <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
              Guess
            </TableCell>
            <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
              Result
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                {format(item.time, "HH:mm:ss")}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                {item.condition === GameCondition.OVER
                  ? `Over ${item.threshold}`
                  : `Under ${item.threshold}`}
                {` (${item.roll})`}
              </TableCell>
              <TableCell>
                <Typography
                  color={item.win ? "success.main" : "error.main"}
                  fontWeight={600}
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {item.win ? "Win" : "Lose"}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GameHistoryTable;
