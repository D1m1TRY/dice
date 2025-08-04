import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
} from "@mui/material";

type RadioOption = {
  value: string;
  label: string;
};

type CustomRadioGroupProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  row?: boolean;
  justifyContent?: "center" | "flex-start" | "flex-end";
};

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  label,
  value,
  onChange,
  options,
  row = true,
  justifyContent = "center",
}) => {
  return (
    <Box display="flex" justifyContent={justifyContent}>
      <FormControl component="fieldset">
        {label && (
          <FormLabel
            component="legend"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {label}
          </FormLabel>
        )}
        <RadioGroup
          row={row}
          value={value}
          onChange={(_, val) => onChange(val)}
          name={label.toLowerCase().replace(/\s+/g, "-") || "radio-group"}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
              sx={{
                fontSize: { xs: "0.875rem", sm: "1rem" },
                "& .MuiFormControlLabel-label": {
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default CustomRadioGroup;
