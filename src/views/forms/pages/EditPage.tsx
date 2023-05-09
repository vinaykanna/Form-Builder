import { TextField, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePage } from "../../../api/services/forms";
import DialogWrapper from "../../../components/DialogWrapper";
import { snack } from "../../../components/toast";
import {
  selectForms,
  setEditPageOpen,
  setAddPageOpen,
} from "../../../redux/reducers/formsSlice";
import { SubmitType } from "../../../types";

function EditPage() {
  const queryClient = useQueryClient();
  const params = useParams();
  const [name, setName] = useState("");
  const { data, activePage, editPageOpen } = useSelector(selectForms);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(data?.pages[activePage]?.name);
  }, [data, activePage]);

  const { mutate } = useMutation(updatePage, {
    onSuccess: () => {
      snack.success("Page updated");
      dispatch(setEditPageOpen(false));
      queryClient.invalidateQueries("form-details");
    },
    onError: () => {
      snack.error("Error creating page");
      dispatch(setAddPageOpen(false));
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      formId: params.formId,
      pageId: data?.pages[activePage]?._id,
      data: {
        name,
      },
    });
  };

  return (
    <DialogWrapper
      title="Edit Page"
      open={editPageOpen}
      setOpen={(v) => dispatch(setEditPageOpen(v))}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          size="small"
          variant="outlined"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          label="Page Name"
          fullWidth
        />
        <Box textAlign="right">
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            sx={{ mt: 3 }}
          >
            Update Page
          </Button>
        </Box>
      </form>
    </DialogWrapper>
  );
}

export default EditPage;
