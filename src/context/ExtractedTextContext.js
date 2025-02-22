import React, { createContext, useState, useContext } from "react";

// Create context
const ExtractedTextContext = createContext();

// Custom hook for easy access
export const useExtractedText = () => {
  const context = useContext(ExtractedTextContext);
  if (!context) {
    throw new Error("useExtractedText must be used within an ExtractedTextProvider");
  }
  return context;
};

// Context Provider component
export const ExtractedTextProvider = ({ children }) => {
  const [extractedText, setExtractedText] = useState("");

  return (
    <ExtractedTextContext.Provider value={{ extractedText, setExtractedText }}>
      {children}
    </ExtractedTextContext.Provider>
  );
};

export default ExtractedTextContext;
