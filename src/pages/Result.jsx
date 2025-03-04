import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useExtractedText } from "../context/ExtractedTextContext"; 
import { useNavigate } from "react-router-dom";

// Function to remove HTML tags
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const Result = () => {
  const { extractedText } = useExtractedText(); 
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Extracted Text
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap", backgroundColor: "#f4f4f4", p: 2 }}>
            {stripHtmlTags(extractedText) || "No text extracted"} 
          </Typography>
          <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate("/")}>
            Upload Another Filesdjsdjsdjsdjsdjksjkdsjkjdsksjkdjk
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Result;
