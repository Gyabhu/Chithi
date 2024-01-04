import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket, { SendMessage } from "react-use-websocket";
import useCrud from "../../hooks/useCrud";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Scroll from "./Scroll";
import VoiceCall from "@mui/icons-material/PhoneRounded";
import VideoCall from "@mui/icons-material/VideocamRounded";

interface SendMessageData {
  type: string;
  message: string;
  [key: string]: any;
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const ChatInterface = () => {
  const [newMessage, setNewMessage] = useState<Message[]>([]);
  const theme = useTheme();
  const [message, setMessage] = useState("");
  const { chatId } = useParams();
  const { fetchData } = useCrud<Message>([], `/chats/?chat_id=${chatId}`);

  const socketUrl = chatId ? `ws://127.0.0.1:8000/chats/${chatId}` : null;

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        setNewMessage([]);
        setNewMessage(Array.isArray(data) ? data : []);
        console.log("Connected");
      } catch (error) {
        console.log(error);
      }
    },
    onClose: () => {
      console.log("Closed!");
    },
    onError: () => {
      console.log("Error!");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
      setMessage("");
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendJsonMessage({
        type: "message",
        message,
      } as SendMessageData);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendJsonMessage({
      type: "message",
      message,
    } as SendMessageData);
  };

  function formatTimeStamp(timestamp: string): string {
    const date = new Date(Date.parse(timestamp));
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedTime}`;
  }

  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 2,

          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
          boxShadow: 3,
        }}
      >
        <Typography sx={{ display: open ? "block" : "none" }}>Chats</Typography>
        <Box
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            sx={{
              marginLeft: 30,
              paddingRight: 3,
            }}
          >
            <VoiceCall />
          </IconButton>
          <IconButton edge="start" color="inherit">
            <VideoCall />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ overflow: "hidden", p: 0, height: `calc(100vh-100px)` }}>
        <Scroll>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {newMessage.map((msg: Message, index: number) => {
              return (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Munique" />
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "12px",
                      variant: "body2",
                    }}
                    primary={
                      <>
                        <Typography
                          component="span"
                          variant="body1"
                          color="text.primary"
                          sx={{ display: "inline", fontW: 600 }}
                        >
                          {msg.sender}
                        </Typography>
                        <Typography
                          marginLeft={1}
                          component="span"
                          variant="caption"
                          color="textSecondary"
                        >
                          {formatTimeStamp(msg.timestamp)}
                        </Typography>
                      </>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="body1"
                          style={{
                            overflow: "visible",
                            whiteSpace: "normal",
                            textOverflow: "clip",
                          }}
                          sx={{
                            display: "inline",
                            lineHeight: 1.2,
                            fontWeight: 400,
                            letterSpacing: "-0.2px",
                          }}
                          component="span"
                          color="text.primary"
                        >
                          {msg.content}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Scroll>
      </Box>
      <Box sx={{ position: "sticky", bottom: 0, width: "100%" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            bottom: 0,
            right: 0,
            padding: "1rem",
            backgroundColor: theme.palette.background.default,
            zIndex: 1,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <TextField
              fullWidth
              multiline
              value={message}
              minRows={1}
              maxRows={3}
              onKeyDown={handleKeyDown}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
          </Box>
        </form>
      </Box>
    </>
  );
};
export default ChatInterface;
