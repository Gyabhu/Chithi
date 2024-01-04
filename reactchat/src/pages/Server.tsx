import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import ChatInterface from "../components/Main/ChatInterface";
import PopularChannels from "../components/SecondaryDraw/ChatLists";
import MenuLists from "../components/PrimaryDraw/MenuLists";

const Server = () => {
  // const navigate = useNavigate();
  // const { serverID, channelID } = useParams();
  // const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>(
  //   [],
  //   "/server/category"
  // );

  // if (error !== null && error.message === "400") {
  //   navigate("/");
  //   return null;
  // }

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
        <ChatInterface></ChatInterface>
      </Main>
    </Box>
  );
};
export default Server;
