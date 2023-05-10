import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getForm, submitResponse } from "../api/services/forms";
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
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState<any>([]);

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

  const { mutate: submitForm } = useMutation(submitResponse, {
    onSuccess: () => {
      setSearchParams({ submitted: "true" });
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleNext = (pageData: any) => {
    const fields: any = [];

    for (const key in pageData) {
      const field = data?.pages[active]?.fields.find(
        (field: any) => field?._id === key
      );

      const value = pageData[key];

      const result: any = {
        fieldId: field?._id,
        fieldType: field?.fieldType,
        fieldLabel: field?.label,
        value: null,
      };

      const isName = field?.fieldType === FormBuilderFieldTypes.NAME;
      const isAddress = field?.fieldType === FormBuilderFieldTypes.ADDRESS;

      if (!isName && !isAddress) {
        fields.push({ ...result, value });
        continue;
      }

      for (const inputKey in value) {
        const input = field.inputs?.find(
          (input: any) => input._id === inputKey
        );

        result.value = result.value || [];
        result.value.push({
          inputId: input?._id,
          inputLabel: input?.label,
          value: value[inputKey],
        });
      }

      fields.push(result);
    }

    const prevState = formData;
    const prevPage = prevState[active];

    if (prevPage) {
      prevPage.fields = fields;
    } else {
      prevState.push({
        pageId: data?.pages[active]?._id,
        pageName: data?.pages[active]?.name,
        fields,
      });
    }

    const isLastPage = active === data?.pages?.length - 1;

    if (!isLastPage) {
      setFormData(prevState);
      setActive((prevActive) => prevActive + 1);
      return;
    }

    submitForm({ formId: params.formId, data: prevState });
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
          variant="subtitle1"
          color="primary"
          sx={{ textAlign: "center" }}
        >
          {data?.name}
        </Typography>
      </StyledAccessFormAppbar>
      {searchParams.get("submitted") === "true" ? (
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <Typography variant="h5" color="primary">
            Thank you for submitting the form
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={() => {
              setSearchParams({ submitted: "false" });
              setFormData([]);
              setActive(0);
            }}
          >
            Submit another response
          </Button>
        </Box>
      ) : (
        <StyledAccessFormContainer>
          {data?.pages?.length > 1 && (
            <Stepper
              sx={{ py: 3, borderBottom: "1px solid #E0E0E0" }}
              activeStep={active}
              alternativeLabel
            >
              {data?.pages?.map((item: any) => (
                <Step key={item?._id}>
                  <StepLabel sx={{ cursor: "pointer" }}>{item?.name}</StepLabel>
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
                setActive={setActive}
                onContinue={handleNext}
              />
            );
          })}
        </StyledAccessFormContainer>
      )}
    </Box>
  );
}

export default AccessForm;
