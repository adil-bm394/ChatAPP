import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";

const rooms = ["Main", "Shape", "Royal"];
const purposes = [
  "ReactNative",
  "TypeScript",
  "JavaScript",
  "NodeJs",
  "ReactJs",
  "Other",
];

const Join: React.FC = () => {
  const [purpose, setPurpose] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const joinChat = () => {
    if (purpose && room) {
      navigate(`/chat?purpose=${purpose}&room=${room}`);
      toast.success(`Welcome to ${room} Room`);
    } else {
      toast.error("Please select both purpose and room.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "42px" }}>
        <Typography variant="h4" gutterBottom align="center">
          Join Chat
        </Typography>
        <TextField
          fullWidth
          select
          variant="outlined"
          label="Select Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          margin="normal"
        >
          {purposes.map((purpose) => (
            <MenuItem key={purpose} value={purpose}>
              {purpose}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          select
          variant="outlined"
          label="Select Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          margin="normal"
        >
          {rooms.map((room) => (
            <MenuItem key={room} value={room}>
              {room}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={joinChat}
          style={{ marginTop: "16px", marginBottom: "16px" }}
        >
          Join Chat
        </Button>
      </Paper>
    </Container>
  );
};

export default Join;
