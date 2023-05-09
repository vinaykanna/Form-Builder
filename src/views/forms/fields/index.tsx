import { Box, Divider, Grid, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import availableFields from "../utils/availableFields";
import Field from "./Field";

function Fields() {
  return (
    <Box
      sx={{
        border: "1px solid #22222226",
        borderRadius: "10px",
      }}
    >
      <Box>
        <Typography sx={{ margin: "12px" }} variant="body2">
          Available Fields
        </Typography>
      </Box>
      <Box>
        <Divider />
      </Box>
      <Droppable
        droppableId="formbuilder-available-fields"
        isDropDisabled={true}
      >
        {(provided: any) => (
          <div
            ref={provided.innerRef}
            style={{ height: 500, overflowY: "auto" }}
          >
            <Grid container sx={{ p: 2 }} spacing={2}>
              {availableFields.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Field item={item} index={index} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Droppable>
    </Box>
  );
}

export default Fields;
