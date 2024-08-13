import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";

const socket = io("http://localhost:4000");

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { purpose, room } = useParams<{ purpose: string; room: string }>();
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const username = userDetails?.name;

  useEffect(() => {
    if (username && room) {
      socket.emit("joinRoom", { username, room });
    }

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("roomUsers", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("roomUsers");
      socket.emit("leaveRoom", { username, room });
    };
  }, [username, room]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { message, username, room });
      setMessage("");
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", { purpose, room });
    navigate("/join");
    toast.success("You left the room");
  };

  return (
    <Container
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: "1 1 auto",
          borderBottom: `1px solid ${theme.palette.divider}`,
          margin: "6px 0px 0px 0px",
        }}
      >
        <Box
          sx={{
            flex: "1 1 25%",
            backgroundColor: theme.palette.primary.main,
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 2,
            borderRight: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Room: {room}
          </Typography>
          <Typography variant="subtitle1">User: {username}</Typography>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ mt: 2 }}
            onClick={leaveRoom}
          >
            Leave Room
          </Button>
        </Box>
        <Box
          sx={{
            flex: "1 1 75%",
            display: "flex",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mb: 2,
              padding: 1,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`,
              maxHeight: "calc(100vh - 150px)",
            }}
          >
            <List>
              {messages.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    // borderBottom: `1px solid ${theme.palette.divider}`,
                    paddingY: 1,
                    textDecoration: "none",
                  }}
                >
                  {msg}
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderTop: `1px solid ${theme.palette.divider}`,
              paddingTop: 1,
              paddingBottom: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              sx={{ borderRadius: 1 }}
              autoComplete="off"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              sx={{ padding: 2 }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
