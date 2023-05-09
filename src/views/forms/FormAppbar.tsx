import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FormAppbar() {
  const navigate = useNavigate();

  return (
    <AppBar color="default" position="sticky" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={3}>
          <Button
            onClick={() => navigate(-1)}
            color="primary"
            startIcon={<ArrowBack />}
          >
            Form Details
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default FormAppbar;
