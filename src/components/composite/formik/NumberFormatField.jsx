import {  TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { NumericFormat } from "react-number-format";
import "../../../assets/css/composite/formik/numberFormatField.css"
export const NumberFormatField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field);
    const handleSetFiled = (value) => {
        setFieldValue(field.name, value*1);
    }
    return (
        <NumericFormat
            {...props}
            customInput={TextField}
            onValueChange={(values) => handleSetFiled(values.value)}
        />
    )
}