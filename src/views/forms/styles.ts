import { Box, Button, IconButton, styled } from "@mui/material";

export const StyledMoreIcon = styled(IconButton)(() => ({
  position: "absolute",
  right: 10,
  top: 10,
}));

export const StyledCard = styled(Box)(() => ({
  boxShadow: "0px 3px 12px #0000001A",
  borderRadius: 10,
  padding: 15,
  cursor: "pointer",
  position: "relative",
}));

export const StyledField = styled("div")<{
  isdragging?: 0 | 1;
}>(({ isdragging }) => ({
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: `1px solid ${isdragging ? "#00B8D4" : "#E0E0E0"}`,
  borderRadius: "5px",
  alignItems: "center",
  display: "flex",
  gap: 10,
  padding: "15px 20px",
  minHeight: "30px",
  cursor: "pointer",
  ...(!isdragging && {
    transform: "none !important",
  }),
}));

export const DummyStyledField = styled("div")(() => ({
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: `1px solid #E0E0E0`,
  borderRadius: "5px",
  alignItems: "center",
  display: "flex",
  gap: 10,
  padding: "15px 20px",
  minHeight: "30px",
  cursor: "pointer",
}));

export const StyledPagesContainer = styled("div")(() => ({
  border: "1px solid #22222226",
  borderRadius: "10px",
  marginRight: 50,
  marginBottom: 60,
}));

export const StyledPagesDroppable = styled("div")(() => ({
  paddingTop: 20,
  paddingBottom: 50,
  "& > div:first-of-type": {
    borderTop: "1px solid #22222226",
  },
}));

export const StyledEmptyPagePlaceholder = styled("div")(() => ({
  padding: "10px",
  textAlign: "center",
  background: "rgba(0,0,0,0.04)",
  border: "1px dashed rgba(0,0,0,0.1)",
  width: "70%",
  margin: "0 auto",
}));

export const StyledPreviewRibbon = styled("div")(({ theme }) => ({
  padding: "10px",
  width: "200px",
  textAlign: "center",
  position: "absolute",
  right: -70,
  top: 20,
  transform: "rotate(45deg)",
  background: theme.palette.secondary.main,
}));

export const StyledAccessFormContainer = styled("div")(() => ({
  paddingBottom: "50px",
  maxWidth: 1000,
  margin: "auto",
  position: "relative",
  overflow: "hidden",
  background: "white",
  border: "1px solid #E0E0E0",
  borderRadius: 10,
}));

export const StyledAccessFormAppbar = styled("div")(() => ({
  background: "white",
  borderBottom: "1px solid #E0E0E0",
  position: "sticky",
  top: 0,
  width: "100%",
  padding: "15px 10px",
  zIndex: 100,
  marginBottom: 20,
}));

export const StyledDraggableList = styled("div")<{
  isdraggingover: "true" | "false";
  height: string;
}>(({ isdraggingover, height }) => ({
  width: "100%",
  border:
    isdraggingover === "true"
      ? "1px dashed rgba(0,0,0,0.2)"
      : "1px dashed transparent",
  padding: "10px",
  height: height || "auto",
  overflowY: "auto",
}));

export const StyledDraggableItem = styled("div")<{
  isdragging: "true" | "false";
  draggablestyle: any;
}>(({ isdragging, theme, draggablestyle }) => ({
  userSelect: "none",
  marginBottom: "15px",
  minHeight: "100px",
  border: `1px solid ${
    isdragging === "true" ? theme.palette.primary.main : "rgba(0,0,0,0.1)"
  }`,
  borderRadius: "10px",
  background:
    isdragging === "true" ? theme.palette.primary.light : "rgba(0,0,0,0.03)",
  cursor: "pointer",
  ...draggablestyle,
}));

export const StyledScrollTarget = styled("span")(() => ({
  display: "block",
  position: "absolute",
  marginTop: "-140px",
  paddingTop: "140px",
  visibility: "hidden",
}));

export const StyledDates = styled("div")<{ index: number }>(({ index }) => {
  return {
    position: "relative",
    padding: "15px 0px",
    gap: 1,
    "&:before": {
      content: '""',
      position: "absolute",
      left: 0,
      width: "30px",
      height: "1px",
      background: "lightgrey",
      top: "50%",
    },
    "&:after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: "50%",
      width: "1px",
      height: index === 0 ? "50%" : "100%",
      background: "lightgrey",
    },
  };
});

export const GreyButton = styled(Button)({
  backgroundColor: "rgba(0,0,0,0.1)",
  color: "black",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export const StyledSubTaskTable = styled("table")({
  width: "100%",
  borderCollapse: "collapse",
  background: "#FFFFFF",
  fontFamily: "muli_regular",
  paddingBottom: "30px",
  tableLayout: "fixed",
  "& tr": {
    cursor: "pointer",
  },
  "& th": {
    padding: "15px 10px",
    textAlign: "left",
  },
  "& td": {
    textAlign: "left",
    padding: "15px",
  },
  "& tbody tr:not(:last-child)": {
    borderBottom: "1px solid #e0e0e0",
  },
});

export const StyledDraggebleFormField = styled("div")<{
  isdragging: 0 | 1;
  active: 1 | 0;
  focused: 1 | 0;
}>(({ isdragging, active, focused }) => ({
  padding: "15px 10px",
  minHeight: "100px",
  border: "1px solid transparent",
  borderBottom: "1px solid #22222226",
  transition: "0.3s",
  position: "relative",
  ...((isdragging || active) && {
    border: `1px dashed 
         rgba(0,0,0,0.5) !important`,
  }),
  ...(focused && {
    background: "rgba(233, 107, 116, 0.06)",
    "&:before": {
      content: '""',
      position: "absolute",
      left: -2,
      top: 0,
      width: 2,
      height: "100%",
      background: "#E44652",
    },
  }),
  "& .field": {
    userSelect: "none",
    padding: "10px 5px",
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      left: 0,
      width: "100%",
      height: "100%",
      background: "transparent",
      top: 0,
      zIndex: 3,
    },
  },
  "& .actions": {
    position: "absolute",
    left: "100%",
    top: -1,
    display: "flex",
    flexDirection: "column",
    background: "white",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    opacity: active || isdragging ? 1 : 0,
    visibility: active || isdragging ? "visible" : "hidden",
    transition: "0.3s",
    border: "1px dashed rgba(0,0,0,0.5)",
  },
}));

export const StyledTimline = styled("div")(() => {
  return {
    display: "flex",
    marginTop: 20,
    "& > div": {
      textAlign: "center",
      marginRight: 100,
      "& div": {
        background: "#F4F4F4",
        padding: "5px 20px",
        borderRadius: 5,
        marginBottom: 10,
      },
    },
    "& > div:not(:last-child)": {
      marginRight: 100,
      "& div": {
        position: "relative",
        "&:after": {
          content: '""',
          position: "absolute",
          left: "100%",
          top: "50%",
          width: "100px",
          height: "1px",
          border: "0.5px dashed lightgrey",
        },
      },
    },
  };
});
