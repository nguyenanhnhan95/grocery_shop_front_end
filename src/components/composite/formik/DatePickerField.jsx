import React from "react";

import dayjs from "dayjs";
import CustomDatePicker from "../custom/CustomDatePicker";

export const DatePickerField = ({ field, title, form, ...props }) => {

    return (
        <CustomDatePicker 
               autoComplete="off"
               value={field.value ? dayjs(new Date(field.value)) : null}
               onChange={val => {
                   form.setFieldValue(field.name, val);
               }}
               title={title}
               {...props}
        />
    );
};