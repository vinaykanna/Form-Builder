import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAddFieldDefaultValues } from "../utils/generateAddFieldDefaultValues";
import { getAddFieldSchema } from "../utils/generateAddFieldSchema";
import {
  FormBuilderFieldTypes,
  renderFieldsComponent,
} from "../utils/renderFieldsComponent";
import { updateField } from "../../../api/services/forms";
import DrawerWrapper from "../../../components/DrawerWrapper";
import { snack } from "../../../components/toast";
import { selectForms } from "../../../redux/reducers/formsSlice";
import LoadingButton from "../../../components/LoadingButton";

const FieldProperties = ({ open, setOpen, item }: any) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const { data, activePage, validations } = useSelector(selectForms);

  const { mutate } = useMutation(updateField, {
    onSuccess: () => {
      snack.success("Field properties updated");
      setOpen(false);
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { watch, control, handleSubmit } = useForm({
    defaultValues: getAddFieldDefaultValues(item),
    mode: "onChange",
    resolver: yupResolver(getAddFieldSchema(item)),
  });

  const onSubmit = (result: any) => {
    const apiData = { ...result };

    if (item?.fieldType === FormBuilderFieldTypes.DATE) {
      if (apiData.allowedDates === "CUSTOM") {
        apiData.dateRange = {
          startDate: apiData.startDate,
          endDate: apiData.endDate,
        };
      }
    }

    if (item?.fieldType === FormBuilderFieldTypes.DECISION_BOX) {
      apiData.decisionText = {
        checkedText: apiData.checkedText,
        uncheckedText: apiData.uncheckedText,
      };
    }

    if (item?.fieldType === FormBuilderFieldTypes.FILE_UPLOAD) {
      apiData.fileMaxSize = {
        size: apiData.fileMaxSize,
        type: apiData.fileMaxSizeType,
      };
    }

    if (item?.fieldType === FormBuilderFieldTypes.NAME) {
      const title = apiData.inputs?.find(
        (item: any) => item.inputType === "TITLE"
      );
      title.options = apiData.titleOptions;
    }

    if (item?.fieldType === FormBuilderFieldTypes.SINGLE_LINE) {
      if (apiData.validation) {
        const validation = validations?.find(
          (item: any) => item?._id === apiData.validation
        );
        apiData.validation = {
          id: validation?._id,
          format: validation?.format,
          message: validation?.message,
        };
      }
    }

    mutate({
      formId: params.formId,
      pageId: data?.pages?.[activePage]?._id,
      fieldId: item._id,
      data: apiData,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Properties">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ "& div:first-of-type": { mt: 0 } }}>
          {renderFieldsComponent(item, control, watch)}
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={false}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Update"
              color="secondary"
            />
          </Box>
        </Box>
      </form>
    </DrawerWrapper>
  );
};

export default FieldProperties;
