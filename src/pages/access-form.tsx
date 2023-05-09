import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getForm, updatePage } from "../api/services/forms";
import Loader from "../components/Loader";
import { snack } from "../components/toast";
import { ResType } from "../types";
import AccessFormFields from "../views/forms/AccessFormFields";
import {
  StyledAccessFormAppbar,
  StyledAccessFormContainer,
} from "../views/forms/styles";
import { FormBuilderFieldTypes } from "../views/forms/utils/renderFieldsComponent";

function AccessForm() {
  const queryClient = useQueryClient();
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const { isLoading }: ResType = useQuery(
    ["form-details", params.formId],
    getForm,
    {
      onSuccess: (res) => {
        setData(res.data);
      },
      onError: (err) => {
        snack.error(err.message);
      },
      cacheTime: 0,
      refetchOnWindowFocus: true,
    }
  );

  const { mutate: updatePageFields } = useMutation(updatePage, {
    onSuccess: () => {
      snack.success("Values saved");
      queryClient.invalidateQueries("form-details");
      if (active === data?.pages?.length - 1) {
        return;
      }
      setActive(active + 1);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (pageData: any) => {
    const finalData = {
      ...formData,
      [data?.pages[active]._id]: pageData,
    };

    const activePageData = finalData[data?.pages[active]._id];
    const activeFields = [...cloneDeep(data?.pages[active].fields)];

    for (const key in activePageData) {
      const value = activePageData[key];
      const field = activeFields?.find((field: any) => field._id === key);
      const type = field?.fieldType;

      if (!field) continue;

      const hasInputs =
        type === FormBuilderFieldTypes.NAME ||
        type === FormBuilderFieldTypes.ADDRESS;

      if (!hasInputs) {
        field.value = value || null;
        continue;
      }

      Object.keys(value).forEach((inputKey) => {
        const input = field.inputs?.find(
          (input: any) => input._id === inputKey
        );

        if (!input) return;

        input.value = value[inputKey] || null;
      });
    }

    updatePageFields({
      formId: params.formId,
      pageId: data?.pages[active]?._id,
      data: {
        fields: activeFields,
      },
    });
  };

  const handleNext = (pageData: any) => {
    setFormData({
      ...formData,
      [data?.pages[active]._id]: pageData,
    });

    handleSubmit(pageData);
  };

  if (isLoading) return <Loader />;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "rgba(233, 107, 116, 0.04)",
        pb: 5,
      }}
    >
      <StyledAccessFormAppbar>
        <Typography
          variant="subtitle2"
          color="primary"
          sx={{ textAlign: "center" }}
        >
          {data?.name}
        </Typography>
      </StyledAccessFormAppbar>
      <StyledAccessFormContainer>
        {data?.pages?.length > 1 && (
          <Stepper
            sx={{ py: 3, borderBottom: "1px solid #E0E0E0" }}
            activeStep={active}
            alternativeLabel
          >
            {data?.pages?.map((item: any, index: number) => (
              <Step key={item?._id}>
                <StepLabel
                  sx={{ cursor: "pointer" }}
                  onClick={() => setActive(index)}
                >
                  {item?.name}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
        {data?.pages?.map((item: any, index: number) => {
          if (active !== index) return null;
          return (
            <AccessFormFields
              key={item?._id}
              data={item?.fields}
              active={active}
              onContinue={handleNext}
            />
          );
        })}
      </StyledAccessFormContainer>
    </Box>
  );
}

export default AccessForm;
