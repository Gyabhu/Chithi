import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import PopularChannels from "../components/SecondaryDraw/ChatLists";
import ChatsPlaceholder from "../components/Main/ChatsPlaceholder";
import MenuLists from "../components/PrimaryDraw/MenuLists";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <MenuLists open={false} />
      </PrimaryDraw>
      <SecondaryDraw>
        <PopularChannels open={false} />
      </SecondaryDraw>
      <Main>
        <ChatsPlaceholder />
      </Main>
    </Box>
  );
};
export default Home;
