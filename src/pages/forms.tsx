import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { getForms } from "../api/services/forms";
import EmptyPage from "../components/EmptyPage";
import FloatingButton from "../components/FloatingButton";
import Loader from "../components/Loader";
import SearchContainer from "../components/SearchContainer";
import useFilteredData from "../hooks/useFilteredData";
import { ResType } from "../types";
import AddForm from "../views/forms/AddForm";
import FormCard from "../views/forms/FormCard";
import Header from "../views/forms/Header";

const MyForms = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading }: ResType = useQuery(
    ["forms", { type: "TEMPLATE" }],
    getForms
  );

  const filteredData = useFilteredData(data?.data, ["name", "tags"], search);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />
      <Box px={3} py={3}>
        {data?.data?.length > 0 && (
          <Box display="flex" gap={1} justifyContent="space-between">
            <SearchContainer
              value={search}
              placeHolder="Search by name or tags"
              minWidth="400px"
              onChange={setSearch}
            />
          </Box>
        )}
        <Grid item container spacing={2} mt={2}>
          {filteredData?.map((form: any, index: number) => (
            <Grid item sm={4} key={index}>
              <FormCard data={form} key={form.id} />
            </Grid>
          ))}
        </Grid>
        {data?.data?.length > 0 && (
          <FloatingButton position="right" onClick={() => setOpen(true)} />
        )}
        {data?.data?.length === 0 && (
          <EmptyPage
            minHeight="70vh"
            title="There are no forms available"
            btn2Title="Create Form"
            btn2Action={() => setOpen(true)}
            desc="Click on create form to add a new form"
          />
        )}
        <AddForm open={open} setOpen={setOpen} />
      </Box>
    </>
  );
};

export default MyForms;
