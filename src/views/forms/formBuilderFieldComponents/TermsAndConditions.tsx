import { Box } from "@mui/material";
import FormCheckbox from "../../../components/FormFields/FormCheckbox";
import FormEditor from "../../../components/FormFields/FormEditor";
import FormInput from "../../../components/FormFields/FormInput";

const TermsAndConditions = (props) => {
  const { control } = props;
  return (
    <>
      <Box mt={2}>
        <FormInput name="label" label="Field Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormEditor
          id={"termsAndConditions"}
          control={control}
          label="Terms and Conditions"
          name="termsAndConditions"
        />
      </Box>
      <Box mt={2}>
        <FormCheckbox control={control} name="required" label="Mandatory" />
      </Box>
    </>
  );
};

export default TermsAndConditions;
