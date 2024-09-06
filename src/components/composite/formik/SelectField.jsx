import { FormControl, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import "../../../assets/css/composite/formik/selectedFieldFormik.css"
import { StyleFocusFormControl } from '../styleMui/selectMui';
import { getScreenThem } from '../../../utils/commonUtils';
import { useScreenMode } from '../../../hook/auth/useScreenMode';
import { validation } from '../../../utils/validation';
import { useCallback, memo } from 'react';


const SelectField = ({ options, attribute, processField, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props.name);
    const handleChange = useCallback((event) => {
        const { value } = event.target;
        setFieldValue(field.name, value);
        if (validation.checkFunction(processField)) {
            processField(value, setFieldValue);
        }
    }, [processField, field.name, setFieldValue]);
    const { screenMode } = useScreenMode()
    return (
        <FormControl fullWidth error={meta.touched && !!meta.error}>
            <StyleFocusFormControl
                {...field}
                className={props.className}
                multiple={props.multi}
                value={field.value ?? (props.multi ? [] : '')}
                displayEmpty
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={
                    (field.value !== null && field.value?.length !== 0)
                        ? null
                        : () => props.nameDefault
                }

                MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                        className: getScreenThem(screenMode),
                    },
                }}

            >
                {options && options.map((option, index) => (
                    <MenuItem key={index} value={option[attribute]} >
                        {option.name}
                    </MenuItem>
                ))}
            </StyleFocusFormControl>
        </FormControl>
    )
}
export default memo(SelectField);