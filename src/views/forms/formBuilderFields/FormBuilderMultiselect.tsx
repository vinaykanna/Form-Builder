import { Autocomplete, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { getFieldSize } from "../../../utils/getFieldSize";

interface Props {
  label?: string;
  name: string;
  control: any;
  options: Array<{ label: string; value: string }>;
  trigger?: () => void;
  required?: boolean;
  fieldSize: "SMALL" | "MEDIUM" | "LARGE";
}

function FormBuilderMultiselect(props: Props) {
  const {
    name,
    control,
    label = "",
    options,
    trigger,
    required = false,
    fieldSize = "LARGE",
  } = props;

  return (
    <>
      <Typography gutterBottom variant="body2">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Autocomplete
              size="small"
              sx={{
                width: getFieldSize(fieldSize),
              }}
              multiple
              disablePortal
              onChange={(_, value) => {
                field.onChange(value);
                if (trigger) {
                  trigger();
                }
              }}
              value={Array.isArray(field.value) ? field.value : []}
              options={options}
              isOptionEqualToValue={(option, value) => {
                return option.value === value.value;
              }}
              getOptionLabel={(option) => option.label}
              fullWidth
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    onBlur={field.onBlur}
                    error={Boolean(error)}
                  />
                  {error && (
                    <Typography
                      variant="caption"
                      sx={{ pl: "2px", display: "block" }}
                      color="rgb(211, 47, 47)"
                    >
                      {error.message || (error as any)?.value?.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </>
        )}
      />
    </>
  );
}

export default FormBuilderMultiselect;
