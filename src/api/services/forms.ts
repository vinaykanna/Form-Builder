import { http } from "../http";

const createForm = (data: any) => {
  return http.post("/forms", data);
};

const updateForm = ({ data, id }: any) => {
  return http.put(`/forms/${id}`, data);
};

const deleteForm = ({ id }: any) => {
  return http.delete(`/forms/${id}`);
};

const cloneForm = ({ id, data }: any) => {
  return http.post(`/forms/${id}/clone`, data);
};

const getForms = ({ queryKey }: any) => {
  return http.get("/forms", { params: { ...queryKey[1] } });
};

const getForm = ({ queryKey }: any) => {
  return http.get(`/forms/${queryKey[1]}`);
};

const addPage = ({ formId, name }: any) => {
  return http.post(`/forms/${formId}/pages`, { name });
};

const duplicatePage = ({ formId, pageId }: any) => {
  return http.post(`/forms/${formId}/pages/${pageId}/clone`);
};

const deletePage = ({ formId, pageId }: any) => {
  return http.delete(`/forms/${formId}/pages/${pageId}`);
};

const updatePage = ({ formId, pageId, data }: any) => {
  return http.patch(`/forms/${formId}/pages/${pageId}`, data);
};

const deleteField = ({ formId, pageId, fieldId }: any) => {
  return http.delete(`/forms/${formId}/pages/${pageId}/fields/${fieldId}`);
};

const addField = ({ formId, pageId, data }: any) => {
  return http.post(`/forms/${formId}/pages/${pageId}/fields`, data);
};

const updateField = ({ formId, pageId, fieldId, data }: any) => {
  return http.patch(`/forms/${formId}/pages/${pageId}/fields/${fieldId}`, data);
};

const submitResponse = ({ formId, data }: any) => {
  return http.post(`/forms/${formId}/submit-response`, data);
};

const getFormRespones = ({ queryKey }: any) => {
  return http.get(`/forms/${queryKey[1]}/responses`);
};

export {
  getForms,
  createForm,
  updateForm,
  deleteForm,
  getForm,
  addPage,
  updatePage,
  deleteField,
  addField,
  updateField,
  cloneForm,
  deletePage,
  duplicatePage,
  submitResponse,
  getFormRespones,
};
