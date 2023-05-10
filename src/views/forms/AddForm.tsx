import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { createForm } from "../../api/services/forms";
import DrawerWrapper from "../../components/DrawerWrapper";
import FormInput from "../../components/FormFields/FormInput";
import { snack } from "../../components/toast";
import {
  createFormDefaultValues,
  CreateFormSchema,
} from "../../validations/createForm";
import { DialogProps } from "../../types";
import LoadingButton from "../../components/LoadingButton";
import { useNavigate } from "react-router-dom";

function AddForm({ open, setOpen }: DialogProps) {
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: createFormDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateFormSchema()),
  });

  const { mutate } = useMutation(createForm, {
    onSuccess: (res: any) => {
      setOpen(false);
      reset(createFormDefaultValues);
      snack.success("Form created");
      navigate(`/form-builder/${res?.data?._id}`);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onFormSubmit = (data: any) => {
    mutate({
      ...data,
      type: "TEMPLATE",
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Add New Form">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box>
          <FormInput control={control} name="name" label="Form Name" />
        </Box>
        <Box mt={2}>
          <FormInput
            control={control}
            name="description"
            label="Form Description"
            multiline
          />
        </Box>
        <LoadingButton
          loading={false}
          fullWidth
          sx={{ mt: 3 }}
          type="submit"
          loadingColor="white"
          title="Create Form"
          color="secondary"
        />
      </form>
    </DrawerWrapper>
  );
}

export default AddForm;
