import { Box, Divider, Grid, Typography } from "@mui/material";
import DialogWrapper from "../../components/DialogWrapper";
import { FormBuilderFieldTypes } from "./utils/renderFieldsComponent";
import moment from "moment";

function ViewResponse({ open, setOpen, data }: any) {
  return (
    <DialogWrapper
      title="Response Details"
      open={open}
      setOpen={setOpen}
      width="lg"
    >
      {data?.response?.map((res: any, index: number) => (
        <Box key={index} mb={4}>
          <Typography mb={1} variant="subtitle2" color="textSecondary">
            {res?.pageName}
          </Typography>
          <Divider />
          <Grid container spacing={2} mt={1}>
            {res?.fields?.map((field: any, index: number) => (
              <Grid item xs={3} key={index}>
                <Typography variant="body2" color="GrayText">
                  {field?.fieldLabel}
                </Typography>
                {renderValue(field)}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </DialogWrapper>
  );
}

function renderValue(field: any) {
  switch (field?.fieldType) {
    case FormBuilderFieldTypes.EMAIL:
      return <Typography variant="body1">{field?.value || "NA"}</Typography>;
    case FormBuilderFieldTypes.DATE:
      return (
        <Typography variant="body1">
          {field?.value ? moment(field?.value).format("YYY-MM-DD") : "NA"}
        </Typography>
      );
    case FormBuilderFieldTypes.MULTI_LINE:
      return <Typography variant="body1">{field?.value || "NA"}</Typography>;
    case FormBuilderFieldTypes.NUMBER:
      return <Typography variant="body1">{field?.value || "NA"}</Typography>;
    case FormBuilderFieldTypes.PHONE:
      return (
        <Typography variant="body1">
          {field?.value?.code ? field?.value?.code + "-" : ""}{" "}
          {field?.value?.number ? field?.value?.number : "NA"}
        </Typography>
      );
    case FormBuilderFieldTypes.RADIO:
      return <Typography variant="body1">{field?.value || "NA"}</Typography>;
    case FormBuilderFieldTypes.SINGLE_LINE:
      return <Typography variant="body1">{field?.value || "NA"}</Typography>;
    case FormBuilderFieldTypes.DROPDOWN:
      return <Typography variant="body1">{field?.value || "NA"}</Typography>;
    case FormBuilderFieldTypes.DROPDOWN_MULTIPLE:
      return (
        <Typography variant="body1">
          {field?.value?.map((item: any) => item?.value)?.join(", ") || "NA"}
        </Typography>
      );
    case FormBuilderFieldTypes.CHECKBOX:
      return (
        <Typography variant="body1">
          {field?.value?.map((item: any) => item?.value)?.join(", ") || "NA"}
        </Typography>
      );
    case FormBuilderFieldTypes.TERMS_AND_CONDITIONS:
      return <Typography variant="body1">{field?.value || "NA"}</Typography>;
    case FormBuilderFieldTypes.FILE_UPLOAD:
      return (
        <Box>
          {field?.value?.map((item: any, index: number) => (
            <Typography variant="body1" key={item?.url}>
              {index + 1}.{" "}
              <a href={item?.url} target="_blank">
                {item?.name}
              </a>
            </Typography>
          ))}
        </Box>
      );
    case FormBuilderFieldTypes.DECISION_BOX:
      return (
        <Typography variant="body1">{field?.value ? "Yes" : "No"}</Typography>
      );
    case FormBuilderFieldTypes.CURRENCY:
      return <Typography variant="body1">{field?.value || "NA"}</Typography>;
    case FormBuilderFieldTypes.NAME:
      return (
        <Box>
          {field?.value?.map((item: any) => (
            <Typography variant="body1" key={item?.url}>
              {item?.inputLabel}: {item?.value}
            </Typography>
          ))}
        </Box>
      );
    case FormBuilderFieldTypes.ADDRESS:
      return (
        <Box>
          {field?.value?.map((item: any) => (
            <Typography variant="body1" key={item?.url}>
              {item?.inputLabel}: {item?.value}
            </Typography>
          ))}
        </Box>
      );
    default:
      return <Typography variant="body1">NA</Typography>;
  }
}

export default ViewResponse;
