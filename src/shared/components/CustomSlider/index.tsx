import React from "react";
import { Slider, FormLabel, Box } from "@mui/material";

type SliderMark = {
  value: number;
  label: string;
};

type CustomSliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  marks?: SliderMark[];
  valueLabelDisplay?: "auto" | "on" | "off";
  px?: number;
};

const CustomSlider: React.FC<CustomSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  marks,
  valueLabelDisplay = "on",
  px = 4,
}) => {
  return (
    <Box px={{ xs: 2, sm: px }}>
      {label && <FormLabel>{label}</FormLabel>}
      <Slider
        value={value}
        onChange={(_, val) => onChange(val as number)}
        step={step}
        min={min}
        max={max}
        marks={marks}
        valueLabelDisplay={valueLabelDisplay}
        sx={{
          "& .MuiSlider-mark": {
            display: { xs: "none", sm: "block" },
          },
          "& .MuiSlider-markLabel": {
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          },
        }}
      />
    </Box>
  );
};

export default CustomSlider;
