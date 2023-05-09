import { Box, List, ListItemButton, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { useLocation } from "react-router-dom";
import RouterLink from "../../components/RouterLink";

const formMenu = [
  {
    title: "Form templates",
    path: "",
    pathName: "/forms",
  },
  {
    title: "Form validations",
    path: "form-validations",
    pathName: "/forms/form-validations",
  },
];

const FormNav = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 200,
        borderRight: "1px solid #e0e0e0",
        minHeight: 550,
      }}
    >
      <List>
        {formMenu.map((item: any, index: number) => (
          <RouterLink to={item.path} key={index}>
            <ListItemButton
              selected={item.pathName === location.pathname}
              sx={{
                ...(item.pathName === location.pathname && {
                  borderRight: "3px solid red",
                  borderRadius: "2px",
                }),
              }}
            >
              <ListItemText
                primary={<Typography variant="body2">{item?.title}</Typography>}
              />
            </ListItemButton>
          </RouterLink>
        ))}
      </List>
    </Box>
  );
};

export default FormNav;
