import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

type ChildProps = {
  open: Boolean;
};

type ChildElement = React.ReactElement<ChildProps>;

type SecondaryDrawProps = {
  children: React.ReactNode;
};

const SecondaryDraw = ({ children }: SecondaryDrawProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: `${theme.secondaryDraw.width}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        mt: `${theme.primaryAppBar.height}px`,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: { xs: "none", sm: "block" },
        overflow: "auto",
      }}
    >
      {React.Children.map(children, (child) => {
        return React.isValidElement(child)
          ? React.cloneElement(child as ChildElement, { open })
          : child;
      })}
    </Box>
  );
};
export default SecondaryDraw;
