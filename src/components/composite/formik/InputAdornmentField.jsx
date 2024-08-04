import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { useField, useFormikContext } from "formik";
import "../../../assets/css/composite/formik/inputAdornmentFiled.css"
export const InputAdornmentField = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field);
    const handleSetFiled = (value) => {
        setFieldValue(field.name, value);
    }
    return (
        <FormControl variant="outlined">
            <OutlinedInput
                className={props.className}
                type={props.type}
                onChange={(event) => handleSetFiled(event.target.value)}
                endAdornment={<InputAdornment position="end">{props.adornment}</InputAdornment>}
            />
        </FormControl>
    )
}