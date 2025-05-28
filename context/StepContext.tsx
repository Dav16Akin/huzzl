"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type StepContextType = {
  steps: boolean[];
  toggleStep: (n: number) => void;
};

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setStep] = useState([false, false , false]);

  const toggleStep = (n: number) => {
    setStep(prevSteps => prevSteps.map((step, idx) => idx === n ? !step : step));
  };

  return (
    <StepContext.Provider value={{ steps, toggleStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
};
