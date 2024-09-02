import { FormControl, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import "../../../assets/css/composite/formik/selectedFieldFormik.css"
import { StyleFocusFormControl } from '../styleMui/selectMui';
import { getScreenThem } from '../../../utils/commonUtils';
import { useScreenMode } from '../../../hook/auth/useScreenMode';
import { validation } from '../../../utils/validation';
import { useCallback } from 'react';


export const SelectField = ({ options, attribute, processField, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props.name);
    const handleChange = useCallback((event) => {
        const { value } = event.target;
        if (validation.checkFunction(processField)) {
            processField(value, setFieldValue);
        }
        setFieldValue(field.name, value);
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
                    (field.value !== undefined && field.value?.length !== 0)
                        ? undefined
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