import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getFormRespones } from "../api/services/forms";
import { useQuery } from "react-query";
import { ResType } from "../types";
import Loader from "../components/Loader";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ViewResponse from "../views/forms/ViewResponse";
import { useState } from "react";

function FormResponses() {
  const navigate = useNavigate();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<any>(null);

  const { data, isLoading }: ResType = useQuery(
    ["form-respones", params.formId],
    getFormRespones
  );

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "rgba(233, 107, 116, 0.04)",
          pb: 5,
        }}
      >
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
        {isLoading ? (
          <Loader />
        ) : (
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body2">Total Responses</Typography>
                <Typography variant="body1">
                  {data?.data?.responses?.length}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">Form Name</Typography>
                <Typography variant="body1">
                  {data?.data?.formDetails?.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">Created At</Typography>
                <Typography variant="body1">
                  {moment(data?.data?.formDetails?.createdAt).format(
                    "DD-MM-YYYY HH:mm A"
                  )}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">Updated At</Typography>
                <Typography variant="subtitle2">
                  {moment(data?.data?.formDetails?.updatedAt).format(
                    "DD-MM-YYYY HH:mm A"
                  )}
                </Typography>
              </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ mt: 5, maxWidth: 1000 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>Recorded At</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data?.responses?.map((row: any, index: number) => (
                    <TableRow
                      key={row?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {moment(row?.createdAt).format("DD-MM-YYYY HH:mm A")}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button
                          variant="outlined"
                          size="small"
                          color="secondary"
                          onClick={() => {
                            setOpen(true);
                            setSelectedResponse(row);
                          }}
                        >
                          View Response
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
      <ViewResponse open={open} setOpen={setOpen} data={selectedResponse} />
    </>
  );
}

export default FormResponses;
