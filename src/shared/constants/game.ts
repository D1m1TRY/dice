export enum GameCondition {
  OVER = "over",
  UNDER = "under",
}

export const GAME_CONSTANTS = {
  MAX_HISTORY: 10,
  DEFAULT_THRESHOLD: 50,
  DEFAULT_CONDITION: GameCondition.OVER,
  MIN_ROLL: 1,
  MAX_ROLL: 100,
};

export const SLIDER_MARKS = [
  { value: 1, label: "1" },
  { value: 100, label: "100" },
];

export const CONDITION_OPTIONS = [
  { value: GameCondition.OVER, label: "Over" },
  { value: GameCondition.UNDER, label: "Under" },
];

export const STORAGE_KEYS = {
  HISTORY: "dice-game-history",
} as const;
