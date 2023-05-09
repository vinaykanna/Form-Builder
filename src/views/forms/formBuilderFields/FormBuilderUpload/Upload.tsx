import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import { Box, CircularProgress, styled, Typography } from "@mui/material";
import { useState } from "react";
import { http } from "../../../../api/http";
import { icons } from "../../../../assets";
import { snack } from "../../../../components/toast";
import { FILETYPES } from "../../../../data/constants";
import { fileSizeInKb, covertToKb, getFileSize } from "../../../../utils";

const UploadContainer = styled("div")(() => ({
  display: "flex",
  borderRadius: "8px",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  minHeight: 100,
  textAlign: "center",
  cursor: "pointer",
  padding: "10px 0px",
}));

interface UploadProps {
  id: string;
  onChange: (v: any) => void;
  value: any;
  max: number;
  maxFileSize: {
    type: "KB" | "MB" | "GB";
    size: number;
  };
  accepted: string[];
  setError: (v: string) => void;
}

function Upload(props: UploadProps) {
  const {
    onChange,
    id = "upload",
    max,
    accepted,
    maxFileSize,
    setError,
  } = props;
  let { value } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const handleFile = async (files: File[]) => {
    value = Array.isArray(value) ? value : [];

    if (!files.length) return;

    if (files.length > max) {
      setError(`you can only upload ${max} file(s)`);
      return;
    }

    if (files.length + value.length > max) {
      setError(`you can only upload ${max} file(s)`);
      return;
    }

    if (accepted && accepted.length) {
      const acceptedFiles = [...files].filter((file) => {
        return accepted.includes(file.type);
      });
      if (acceptedFiles.length !== files.length) {
        setError(
          "Only files of type " + accepted.join(", ") + " can be uploaded"
        );
        return;
      }
    }

    if (maxFileSize) {
      const exceededFiles = [...files].filter((file) => {
        return (
          fileSizeInKb(file.size) >=
          covertToKb(maxFileSize.size, maxFileSize.type)
        );
      });
      if (exceededFiles.length) {
        setError(
          "File size should not exceed " +
            maxFileSize.size +
            " " +
            maxFileSize.type
        );
        return;
      }
    }

    setError("");
    setLoading(true);
    try {
      const result: any = [];
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const formData = new FormData();
        formData.append("file", file);
        const res: any = await http.post("/common/upload", formData);
        result.push({
          name: file.name,
          size: file.size,
          type: file.type,
          url: res.data.Location,
        });
      }
      onChange([...value, ...result]);
    } catch (err: any) {
      snack.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    handleFile(e.target.files);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleFile(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setError("");
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return (
    <>
      <input
        type="file"
        multiple
        onChange={handleChange}
        name={id}
        id={id}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: "4px",
        }}
      >
        <label htmlFor={id}>
          <UploadContainer
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
          >
            <div>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box display="flex" gap={1} alignItems="center">
                  <CloudUploadOutlined color="disabled" fontSize="large" />
                  <Typography color="GrayText" sx={{ textAlign: "center" }}>
                    Drag and drop or{" "}
                    <a
                      style={{ pointerEvents: "none" }}
                      href="https://vider.in"
                    >
                      choose files
                    </a>
                  </Typography>
                </Box>
              )}
            </div>
          </UploadContainer>
        </label>
        {value?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              borderTop: "1px solid rgba(0,0,0,0.2)",
              p: 1,
            }}
          >
            {value.map((item: any, index: number) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  padding: "5px",
                  display: "flex",
                  gap: 2,
                  maxWidth: "300px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flex: 1,
                  }}
                >
                  <Box>
                    <a
                      href={item?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={
                          item?.type === FILETYPES.PDF ? icons.pdf : item?.url
                        }
                        alt={item?.name}
                        style={{
                          width: 50,
                          height: 40,
                          objectFit: "contain",
                        }}
                      />
                    </a>
                  </Box>
                  <Box>
                    <Typography variant="body2">{item?.name}</Typography>
                    <Typography variant="caption" color="rgba(0,0,0,0.5)">
                      {getFileSize(item?.size)}
                    </Typography>
                  </Box>
                </Box>
                <Box mt="4px">
                  <CloseRoundedIcon
                    onClick={() => removeFile(index)}
                    sx={{
                      fontSize: "15px",
                      color: "rgba(0,0,0,0.6)",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}

export default Upload;
