import { useParams } from "react-router-dom";
import useCrud from "../../hooks/useCrud";
import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import logo from "../../assets/NewChithi.png";

interface Server {
  id: number;
  name: string;
  category: string;
  icon: string;
}

const ChatsPlaceholder = () => {
  const { chatId } = useParams();
  const url = chatId ? `/server/select/?category=${chatId}` : "/server/select";
  const { dataCRUD, fetchData } = useCrud<Server>([], url);

  useEffect(() => {
    fetchData();
  }, [chatId]);

  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            marginTop: 25,
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "left",
              md: "center",
              lg: "center",
            },
            alignItems: "center",
            height: "400px",
          }}
        >
          <img
            style={{ height: "400px", width: "400px" }}
            src={logo}
            alt="Chithi"
          ></img>
        </Box>

        <Box>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              display: {
                sm: "block",
                fontWeight: 300,
                textTransform: "capitalize",
              },
              textAlign: {
                xs: "center",
                sm: "center",
                md: "center",
                l: "center",
              },
            }}
          >
            Welcome to Chithi!
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              display: {
                sm: "block",
                fontWeight: 400,
                textTransform: "capitalize",
              },
              textAlign: {
                xs: "center",
                sm: "center",
                md: "center",
                l: "center",
              },
            }}
          >
            Hello, Privacy. Hello, Intimacy.
          </Typography>
          <Typography
            variant="subtitle2"
            component="h6"
            sx={{
              marginTop: 12,
              display: {
                sm: "block",
                fontWeight: 300,
              },
              textAlign: {
                xs: "center",
                sm: "center",
                md: "center",
                l: "center",
              },
              opacity: 0.5,
            }}
          >
            Your personal conversations are kept secret with end-to-end
            encrpytion.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default ChatsPlaceholder;
