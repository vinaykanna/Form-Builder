import { AppBar, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Header() {
  return (
    <AppBar color="default" position="static">
      <Box
        sx={{
          textAlign: "center",
          py: 2,
          px: 2,
        }}
      >
        <Typography variant="h5" color="primary">
          Form Builder
        </Typography>
      </Box>
    </AppBar>
  );
}

export default Header;
