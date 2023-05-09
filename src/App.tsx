import ConfirmDialogProvider from "./context/ConfirmDialog";
import MenuPopoverProvider from "./context/MenuPopover";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormBuilder from "./pages/form-builder";
import { Provider } from "react-redux";
import store from "./redux/store";
import MyForms from "./pages/forms";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import AccessForm from "./pages/access-form";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ConfirmDialogProvider>
            <MenuPopoverProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<MyForms />} />
                  <Route
                    path="/form-builder/:formId"
                    element={<FormBuilder />}
                  />
                  <Route path="/access-form/:formId" element={<AccessForm />} />
                </Routes>
              </Router>
            </MenuPopoverProvider>
          </ConfirmDialogProvider>
        </QueryClientProvider>
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  );
}

export default App;
