import {
  Avatar,
  Badge,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import useCrud from "../../hooks/useCrud";
import { Link } from "react-router-dom";
import { MEDIA_URL } from "../../config";
import { styled } from "@mui/material/styles";
import SearchField from "./SearchField";

interface Server {
  id: number;
  name: string;
  category: string;
  icon: string;
}

type Props = {
  open: Boolean;
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatLists: React.FC<Props> = ({ open }) => {
  const theme = useTheme();
  const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>(
    [],
    "/server/select/"
  );

  console.log(isLoading);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        marginTop={1}
        marginBottom={1}
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 2,

          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="h5"
          sx={{ display: open ? "block" : "none", fontWeight: "800" }}
        >
          Chats
        </Typography>
      </Box>
      <Box
        marginBottom={0.7}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SearchField />
      </Box>
      <List>
        {dataCRUD.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/chats/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 0 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "50px" }}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar alt="UserDP" src={`${MEDIA_URL}${item.icon}`} />
                    </StyledBadge>
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: "textSecondary",
                      }}
                    >
                      {item.category}
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    sx: {
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ChatLists;
