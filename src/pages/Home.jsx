import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, CircularProgress, Typography, Card, CardContent } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import { useExtractedText } from "../context/ExtractedTextContext";
// toast.configure();
const Home = () => {
  const { setExtractedText } = useExtractedText(); 
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warn("Please select a file first.", { position: "top-right" });
      return;
    }
  
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    console.log("BASE_URL:", process.env.REACT_APP_BASE_URL);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/files/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      toast.success("File uploaded successfully!", { position: "top-right" });
  
      // Set extracted text and navigate
      console.log(response.data.data.extractedText,"response.data.extractedText")
      setExtractedText(response.data.data.extractedText);
      setTimeout(() => {
        navigate("/result");
      },500)
  
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file. Please try again.", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 12, p: 3, textAlign: "center", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Upload a PDF or Image</Typography>
        <input type="file" onChange={handleFileChange} accept=".pdf,.png,.jpg" hidden id="file-input" />
        <label htmlFor="file-input">
          <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} sx={{ mt: 2 }}>
            Choose File
          </Button>
        </label>
        {file && <Typography sx={{ mt: 2, color: "gray" }}>{file.name}</Typography>}
        <Button variant="contained" color="primary" sx={{ mt: 2, ml: 1 }} onClick={handleUpload} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Home;
