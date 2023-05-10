import {
  Add,
  ContentCopyOutlined,
  Delete,
  Edit,
  MoreVert,
  PlayArrow,
  Share,
} from "@mui/icons-material";
import { Box, Button, IconButton, Tab, Tabs } from "@mui/material";
import { useQueryClient, useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { duplicatePage, deletePage } from "../../../api/services/forms";
import { snack } from "../../../components/toast";
import { useMenu, useConfirm } from "../../../context";
import {
  selectForms,
  setActivePage,
  setAddPageOpen,
  setEditPageOpen,
} from "../../../redux/reducers/formsSlice";

function PagesHeader() {
  const menu = useMenu();
  const queryClient = useQueryClient();
  const params = useParams();
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const { activePage, data } = useSelector(selectForms);

  const { mutate: pageDuplicate } = useMutation(duplicatePage, {
    onSuccess: () => {
      snack.success("Page added");
      dispatch(setActivePage(activePage + 1));
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: pageDelete } = useMutation(deletePage, {
    onSuccess: () => {
      snack.success("Page deleted");
      dispatch(setActivePage(0));
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDuplicate = () => {
    pageDuplicate({
      formId: params.formId,
      pageId: data?.pages[activePage]?._id,
    });
  };

  const handleDelete = () => {
    confirm?.({
      msg: "Are you sure you want to delete this page?",
      action: () => {
        pageDelete({
          formId: params.formId,
          pageId: data?.pages[activePage]?._id,
        });
      },
    });
  };

  const handleMenu = (e: any) => {
    menu?.({
      target: e.currentTarget,
      options: [
        {
          label: "Add Page",
          icon: <Add fontSize="small" color="secondary" />,
          action: () => dispatch(setAddPageOpen(true)),
        },
        {
          label: "Edit Page",
          icon: <Edit fontSize="small" color="secondary" />,
          action: () => dispatch(setEditPageOpen(true)),
        },
        {
          label: "Duplicate Page",
          icon: <ContentCopyOutlined fontSize="small" color="secondary" />,
          action: handleDuplicate,
        },
        {
          label: "Delete Page",
          icon: <Delete fontSize="small" color="secondary" />,
          action: handleDelete,
        },
      ],
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" gap={2} pt={2} pr={1}>
        <a
          rel="noopener noreferrer"
          href={`/access-form/${data._id}`}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <Button startIcon={<PlayArrow />} color="secondary">
            Access
          </Button>
        </a>

        <Button
          onClick={() => {
            navigator.clipboard
              .writeText(
                `${import.meta.env.VITE_WEBSITE_URL}/access-form/${data._id}`
              )
              .then(function () {
                snack.success("Copied to clipboard");
              });
          }}
          startIcon={<Share sx={{ fontSize: "15px !important" }} />}
          color="secondary"
        >
          Share
        </Button>
        <IconButton onClick={handleMenu} color="secondary">
          <MoreVert />
        </IconButton>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activePage}
          onChange={(_: any, val) => dispatch(setActivePage(val))}
          aria-label="basic tabs example"
        >
          {data?.pages?.map((item: any, index: number) => (
            <Tab label={item?.name} {...a11yProps(index)} key={item?._id} />
          ))}
        </Tabs>
      </Box>
    </>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default PagesHeader;
