import { useField, useFormikContext } from "formik";
import { useEffect, useMemo, useState } from "react";
import { EMPTY_STRING } from "../../../utils/commonConstants";
import { validation } from "../../../utils/validation";
import { debounce, InputAdornment, OutlinedInput } from "@mui/material";
import { removeStartZero } from "../../../utils/commonUtils";

export const InputPercent = ({ ...props }) => {
    const [interest, setInterest] = useState('');
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field);
    const handleKeyUp = (e) => {
        let valueRecord = e.target.value.replace(/[\.\%]/g, '');
        let valueShow = EMPTY_STRING;
        if (validation.isPercent(valueRecord) && validation.isNotEmpty(valueRecord)) {
            valueShow = (parseInt(valueRecord) / 100).toFixed(2) + '%';
        } else {
            valueShow = EMPTY_STRING;
            valueRecord = EMPTY_STRING;
        }
        setFieldValue(field.name, valueRecord * 1);
        setInterest(valueShow);
    };
    const handleEnterFiled = (value) => {
        if (validation.isNotEmpty(value) && validation.isNumber(value) && validation.isPercent(value)) {
            setInterest(removeStartZero(value) + '%')
        } else {
            setInterest(EMPTY_STRING)
        }

    }
    useEffect(() => {

    }, [])
    // const debouncedHandleEnterData = useMemo(() => debounce(handleEnterFiled, 500), [handleEnterFiled]);
    return (
        <>
            {/* <input
                type="text"
                className={props.class}
                value={interest}
                onChange={(e) => handleEnterFiled(e.target.value)}
            // onKeyUp={handleKeyUp}
            /> */}
            <OutlinedInput 
            type="number"
            className={props.class}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            // inputProps={{
            //   'aria-label': 'weight',
            // }}
          />
        </>

    );
}