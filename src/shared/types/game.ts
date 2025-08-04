import { GameCondition } from "@/shared/constants";

export type GameResult = {
  roll: number;
  threshold: number;
  condition: GameCondition;
  win: boolean;
  time: Date;
};

export type SavedGameResult = {
  roll: number;
  threshold: number;
  condition: GameCondition;
  win: boolean;
  time: string;
};
