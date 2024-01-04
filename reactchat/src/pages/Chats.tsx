import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import MenuLists from "../components/PrimaryDraw/MenuLists";
import ChatInterface from "../components/Main/ChatInterface";
import ChatLists from "../components/SecondaryDraw/ChatLists";

const Chats = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <MenuLists open={false} />
      </PrimaryDraw>
      <SecondaryDraw>
        <ChatLists open={false} />
      </SecondaryDraw>
      <Main>
        <ChatInterface />
      </Main>
    </Box>
  );
};
export default Chats;
