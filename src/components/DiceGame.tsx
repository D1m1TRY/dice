"use client";
import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import {
  CustomRadioGroup,
  CustomSlider,
  GameHistoryTable,
  GameResultDisplay,
  GameToast,
} from "@/shared/components";
import {
  GameCondition,
  GAME_CONSTANTS,
  SLIDER_MARKS,
  CONDITION_OPTIONS,
  STORAGE_KEYS,
} from "@/shared/constants";
import { GameResult, SavedGameResult } from "@/shared/types";

const DiceGame: React.FC = () => {
  const [threshold, setThreshold] = useState<number>(
    GAME_CONSTANTS.DEFAULT_THRESHOLD
  );
  const [condition, setCondition] = useState<GameCondition>(
    GAME_CONSTANTS.DEFAULT_CONDITION
  );
  const [result, setResult] = useState<GameResult | null>(null);
  const [history, setHistory] = useState<GameResult[]>([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    win: boolean | null;
  }>({ open: false, win: null });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedHistory = window.localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory) as SavedGameResult[];
        const historyWithDates = parsedHistory.map((item) => ({
          ...item,
          time: new Date(item.time),
        }));
        setHistory(historyWithDates);

        if (historyWithDates.length > 0) {
          setResult(historyWithDates[0]);
        }
      } catch (error) {
        console.error("Error loading history from localStorage:", error);
      }
    }
    setIsHistoryLoaded(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isHistoryLoaded) return;
    const toSave = history.map((item) => ({
      ...item,
      time: item.time.toISOString(),
    }));
    window.localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(toSave));
  }, [history, isHistoryLoaded]);

  const handlePlay = () => {
    setSnackbar({ open: false, win: null });
    setTimeout(() => {
      doPlay();
    }, 50);
  };

  const doPlay = () => {
    const roll =
      Math.floor(Math.random() * GAME_CONSTANTS.MAX_ROLL) +
      GAME_CONSTANTS.MIN_ROLL;

    const isOver = condition === GameCondition.OVER;
    const isWinner = isOver ? roll > threshold : roll < threshold;

    const gameResult: GameResult = {
      roll,
      threshold,
      condition,
      win: isWinner,
      time: new Date(),
    };

    setResult(gameResult);
    setHistory((prev) =>
      [gameResult, ...prev].slice(0, GAME_CONSTANTS.MAX_HISTORY)
    );
    setSnackbar({ open: true, win: isWinner });
  };

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbar({ open: false, win: null });
  };

  const getSnackbarMessage = () => {
    if (!result) return "";
    if (result.win) return "You win!";
    const wasHigher = result.roll > result.threshold;
    return `You lose! Number was ${wasHigher ? "higher" : "lower"}`;
  };

  if (!isHistoryLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      maxWidth={{ xs: "100%", sm: 500, md: 600 }}
      width="100%"
      mx="auto"
      mt={4}
      p={{ xs: 2, sm: 3 }}
      borderRadius={2}
      bgcolor="#fff"
      minHeight={400}
    >
      <GameToast
        open={snackbar.open}
        win={snackbar.win}
        message={getSnackbarMessage()}
        onClose={handleCloseSnackbar}
      />

      <GameResultDisplay result={result?.roll || null} />

      <Box mb={3}>
        <CustomRadioGroup
          label=""
          value={condition}
          onChange={(value) => setCondition(value as GameCondition)}
          options={CONDITION_OPTIONS}
          justifyContent="center"
        />
      </Box>

      <Box mb={3}>
        <CustomSlider
          label=""
          value={threshold}
          onChange={setThreshold}
          min={GAME_CONSTANTS.MIN_ROLL}
          max={GAME_CONSTANTS.MAX_ROLL}
          marks={SLIDER_MARKS}
          valueLabelDisplay="on"
        />
      </Box>

      <Box mb={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePlay}
          sx={{ fontSize: { xs: 16, sm: 20 }, py: { xs: 1, sm: 1.5 } }}
        >
          Play
        </Button>
      </Box>

      <GameHistoryTable history={history} />
    </Box>
  );
};

export default DiceGame;
