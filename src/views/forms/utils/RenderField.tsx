import FormBuilderCheckbox from "../formBuilderFields/FormBuilderCheckbox";
import FormBuilderCurrency from "../formBuilderFields/FormBuilderCurrency";
import FormBuilderDate from "../formBuilderFields/FormBuilderDate";
import DecisionBox from "../formBuilderFields/FormBuilderDecisionBox";
import FormBuilderFieldWithInputs from "../formBuilderFields/FormBuilderFieldWithInputs";
import FormBuilderMultiselect from "../formBuilderFields/FormBuilderMultiselect";
import FormBuilderNumber from "../formBuilderFields/FormBuilderNumber";
import FormBuilderPhone from "../formBuilderFields/FormBuilderPhone";
import FormBuilderRadio from "../formBuilderFields/FormBuilderRadio";
import FormBuilderSection from "../formBuilderFields/FormBuilderSection";
import FormBuilderSelect from "../formBuilderFields/FormBuilderSelect";
import FormBuilderTermsAndConditions from "../formBuilderFields/FormBuilderTermsAndConditions";
import FormbuilderTextField from "../formBuilderFields/FormBuilderTextField";
import FormBuilderUpload from "../formBuilderFields/FormBuilderUpload";
import { FormBuilderFieldTypes } from "./renderFieldsComponent";

function RenderField({ item, control }: any) {
  switch (item.fieldType) {
    case FormBuilderFieldTypes.EMAIL:
      return (
        <FormbuilderTextField
          control={control}
          name={item?._id}
          label={item?.label}
          placeholder={item?.placeHolder}
          required={item?.required}
          instructions={item?.instructions}
          fieldSize={item?.fieldSize}
        />
      );

    case FormBuilderFieldTypes.SINGLE_LINE:
      return (
        <FormbuilderTextField
          control={control}
          name={item?._id}
          label={item?.label}
          placeholder={item?.placeHolder}
          required={item?.required}
          instructions={item?.instructions}
          fieldSize={item?.fieldSize}
        />
      );

    case FormBuilderFieldTypes.MULTI_LINE:
      return (
        <FormbuilderTextField
          control={control}
          name={item?._id}
          label={item?.label}
          multiline
          placeholder={item?.placeHolder}
          required={item?.required}
          showCharacterCount={item?.showCharacterCount}
          countType={item?.range?.type}
          instructions={item?.instructions}
          fieldSize={item?.fieldSize}
        />
      );

    case FormBuilderFieldTypes.DECISION_BOX:
      return (
        <DecisionBox control={control} name={item?._id} label={item?.label} />
      );

    case FormBuilderFieldTypes.RADIO:
      return (
        <FormBuilderRadio
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
          options={item?.options?.map((item: any) => ({
            label: item?.label,
            value: item?.value,
          }))}
          displayColumns={item?.displayColumns}
        />
      );

    case FormBuilderFieldTypes.DROPDOWN:
      return (
        <FormBuilderSelect
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
          options={item?.options?.map((item: any) => ({
            label: item?.label,
            value: item?.value,
          }))}
          fieldSize={item?.fieldSize}
        />
      );

    case FormBuilderFieldTypes.DROPDOWN_MULTIPLE:
      return (
        <FormBuilderMultiselect
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
          options={item?.options?.map((item: any) => ({
            label: item?.label,
            value: item?.value,
          }))}
          fieldSize={item?.fieldSize}
        />
      );

    case FormBuilderFieldTypes.DATE:
      return (
        <FormBuilderDate
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
          fieldSize={item?.fieldSize}
        />
      );

    case FormBuilderFieldTypes.CHECKBOX:
      return (
        <FormBuilderCheckbox
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
          options={item?.options?.map((item: any) => ({
            label: item?.label,
            value: item?.value,
          }))}
          displayColumns={item?.displayColumns}
        />
      );

    case FormBuilderFieldTypes.PHONE:
      return (
        <FormBuilderPhone
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
          placeholder={item?.placeHolder}
          includeCountryCode={item?.includeCountryCode}
          allowedCountries={item?.allowedCountries}
          defaultCountryCode={item?.defaultCountryCode}
          fieldSize={item?.fieldSize}
        />
      );

    case FormBuilderFieldTypes.FILE_UPLOAD:
      return (
        <FormBuilderUpload
          accepted={item?.uploadFileTypes?.map((item: any) => item?.value)}
          name={item?._id}
          id={item?.label + "_" + item?._id}
          label={item?.label}
          control={control}
          maxFileSize={item?.fileMaxSize}
          max={item?.range?.max}
          required={item?.required}
        />
      );

    case FormBuilderFieldTypes.CURRENCY:
      return (
        <FormBuilderCurrency
          name={item?._id}
          label={item?.label}
          control={control}
          required={item?.required}
          code={item?.currencyType}
          currencyDisplay={item?.currencyDisplay}
          fieldSize={item?.fieldSize}
        />
      );

    case FormBuilderFieldTypes.NAME:
      return (
        <FormBuilderFieldWithInputs
          name={item?._id}
          label={item?.label}
          control={control}
          required={item?.required}
          inputs={item?.inputs}
          instructions={item?.instructions}
        />
      );

    case FormBuilderFieldTypes.ADDRESS:
      return (
        <FormBuilderFieldWithInputs
          name={item?._id}
          label={item?.label}
          control={control}
          required={item?.required}
          inputs={item?.inputs}
          instructions={item?.instructions}
        />
      );

    case FormBuilderFieldTypes.NUMBER:
      return (
        <FormBuilderNumber
          name={item?._id}
          label={item?.label}
          control={control}
          required={item?.required}
          placeholder={item?.placeHolder}
          instructions={item?.instructions}
          fieldSize={item?.fieldSize}
        />
      );

    case FormBuilderFieldTypes.TERMS_AND_CONDITIONS:
      return (
        <FormBuilderTermsAndConditions
          name={item?._id}
          label={item?.label}
          control={control}
          termsAndConditions={item?.termsAndConditions}
        />
      );

    case FormBuilderFieldTypes.SECTION:
      return (
        <FormBuilderSection
          label={item?.label}
          description={item?.description}
        />
      );

    default:
      return <h1>Not matched</h1>;
  }
}

export default RenderField;
