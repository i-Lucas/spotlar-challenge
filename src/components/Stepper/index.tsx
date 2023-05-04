import * as React from "react";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

interface IStepper {
  step: number | undefined;
};

export default function FooterStepper({ step }: IStepper) {

  const steps = [
    "Select an amount",
    "Select currencies for conversion",
    "Convert !",
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}