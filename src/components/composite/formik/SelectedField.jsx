import { FormControl, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import "../../../assets/css/composite/formik/selectedFieldFormik.css"
import { StyleFocusFormControl } from '../styleMui/selectMui';
import { getScreenThem } from '../../../utils/commonUtils';
import { useScreenMode } from '../../../hook/auth/useScreenMode';


export const SelectField = ({ options, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props.name);
    const handleChange = (event) => {
        setFieldValue(field.name, event.target.value);
    };
    const { screenMode } = useScreenMode()
    return (
        <FormControl fullWidth error={meta.touched && !!meta.error}>
            <StyleFocusFormControl
                {...field}
                className={props.className}
                multiple={props.multi}
                value={field.value || (props.multi ? [] : '')}
                displayEmpty
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={field.value?.length !==0 ? undefined : () => props.nameDefault}

                MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                        className: getScreenThem(screenMode),
                    },
                }}

            >
                {options && options.map((option, index) => (
                    <MenuItem key={index} value={option.id} >
                        {option.name}
                    </MenuItem>
                ))}
            </StyleFocusFormControl>
        </FormControl>
    )
}