import { IconButton, InputAdornment, OutlinedInput,FormControl } from "@mui/material";
import { useMemo, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useField, useFormikContext } from "formik";
import "../../../assets/css/composite/formik/inputPassword.css"
import { debounce } from "../../../utils/commonUtils";
import { PLACE_HOLDER_PASSWORD } from "../../../utils/commonConstants";
export const InputPassword = ({...props}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props.name);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    const handleSaveFile=(value)=>{
        setFieldValue(field.name,value);
    }
    const debouncedHandleEnterData = useMemo(() => debounce(handleSaveFile, 500), [handleSaveFile]);
    return (
        <FormControl className={props.className}   variant="outlined">
            <OutlinedInput
                // {...field}
                autoComplete="current-password"
                placeholder={PLACE_HOLDER_PASSWORD}
                onChange={(e)=>debouncedHandleEnterData(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment  position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            className="icon-button"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                // label="Password"
            />
        </FormControl>
    )
}