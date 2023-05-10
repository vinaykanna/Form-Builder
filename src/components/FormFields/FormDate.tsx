import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  required?: boolean;
}

function FormDate(props: Props) {
  const { name, size = "small", control, label = "", required = false } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextField
              error={Boolean(error)}
              variant="outlined"
              label={`${label} ${required ? "*" : ""}`}
              fullWidth
              size={size}
              {...field}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            {error && (
              <Typography
                variant="caption"
                sx={{ pl: "2px" }}
                color="rgb(211, 47, 47)"
              >
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}

export default FormDate;
