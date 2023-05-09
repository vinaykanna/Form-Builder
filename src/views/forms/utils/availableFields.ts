import { v4 as uuidv4 } from "uuid";
import { FormBuilderFieldTypes } from "./renderFieldsComponent";
import { icons } from "../../../assets";

const availableFields = [
  {
    id: uuidv4(),
    fieldNumber: 1,
    icon: icons.singleLine,
    label: "Single Line",
    fieldType: FormBuilderFieldTypes.SINGLE_LINE,
  },
  {
    id: uuidv4(),
    fieldNumber: 2,
    icon: icons.multiLine,
    label: "Multi Line",
    fieldType: FormBuilderFieldTypes.MULTI_LINE,
  },
  {
    id: uuidv4(),
    fieldNumber: 3,
    icon: icons.numbers,
    label: "Number",
    fieldType: FormBuilderFieldTypes.NUMBER,
  },
  {
    id: uuidv4(),
    fieldNumber: 4,
    icon: icons.name,
    label: "Name",
    fieldType: FormBuilderFieldTypes.NAME,
  },
  {
    id: uuidv4(),
    fieldNumber: 5,
    icon: icons.address,
    label: "Address",
    fieldType: FormBuilderFieldTypes.ADDRESS,
  },
  {
    id: uuidv4(),
    fieldNumber: 6,
    icon: icons.mobileNumber,
    label: "Mobile Number",
    fieldType: FormBuilderFieldTypes.PHONE,
  },
  {
    id: uuidv4(),
    fieldNumber: 7,
    icon: icons.email,
    label: "Email",
    fieldType: FormBuilderFieldTypes.EMAIL,
  },
  {
    id: uuidv4(),
    fieldNumber: 8,
    icon: icons.fieldDate,
    label: "Date",
    fieldType: FormBuilderFieldTypes.DATE,
  },
  {
    id: uuidv4(),
    fieldNumber: 9,
    icon: icons.decisionBox,
    label: "Decision Box",
    fieldType: FormBuilderFieldTypes.DECISION_BOX,
  },
  {
    id: uuidv4(),
    fieldNumber: 10,
    icon: icons.dropDown,
    label: "Drop Down",
    fieldType: FormBuilderFieldTypes.DROPDOWN,
  },
  {
    id: uuidv4(),
    fieldNumber: 11,
    icon: icons.dropDown,
    label: "Multiple Drop Down",
    fieldType: FormBuilderFieldTypes.DROPDOWN_MULTIPLE,
  },
  {
    id: uuidv4(),
    fieldNumber: 12,
    icon: icons.checkBox,
    label: "Check Box",
    fieldType: FormBuilderFieldTypes.CHECKBOX,
  },
  {
    id: uuidv4(),
    fieldNumber: 13,
    icon: icons.checkBox,
    label: "Radio",
    fieldType: FormBuilderFieldTypes.RADIO,
  },
  {
    id: uuidv4(),
    fieldNumber: 14,
    icon: icons.currency,
    label: "Currency",
    fieldType: FormBuilderFieldTypes.CURRENCY,
  },
  {
    id: uuidv4(),
    fieldNumber: 15,
    icon: icons.fileUpload,
    label: "File Upload",
    fieldType: FormBuilderFieldTypes.FILE_UPLOAD,
  },
  {
    id: uuidv4(),
    fieldNumber: 16,
    icon: icons.termsAndConditions,
    label: "Terms & Conditions",
    fieldType: FormBuilderFieldTypes.TERMS_AND_CONDITIONS,
  },
  {
    id: uuidv4(),
    fieldNumber: 17,
    icon: icons.termsAndConditions,
    label: "Section",
    fieldType: FormBuilderFieldTypes.SECTION,
  },
];

export default availableFields;
